import React from 'react'
import './BaseWidget.css'

import Card from '../Card'
import widgetManifest from '../widgets/manifest'
import ErrorWidget from './ErrorWidget'

const baseWidth = 100 / 12
const widgetSize = (_size = 1) => `${baseWidth * parseInt(_size, 10)}%`


export default class BaseWidget extends React.Component {
  //state = { data: null, loading: true }
  
  reloadInterval = null

  componentWillUnmount(){ clearInterval(this.reloadInterval) }

  componentDidMount(){
    this.props.requestDataFetch()

    const reload = parseInt(this.props.widget.reload, 10) || 0
    if (reload > 0) this.reloadInterval = setInterval(this.props.requestDataFetch, reload * 1000)
  }

  loadData(){
    fetch(`/api/widgets/${this.props.widget.id}/exec`)
      .then((res) => res.json())
      .then((data) => this.setState({ data, loading: false }))
  }

  getWidget(){
    if (this.props.widget.data == null) return <Card title={this.props.widget.name || 'Unnamed'} loading />
    if (this.props.widget.data.error) return <ErrorWidget widget={this.props.widget} error={new Error(this.props.widget.data.error)} />

    return (
      <Card title={this.props.widget.name || 'Unnamed'} bodyStyle={{ padding: 0 }}>
        {React.createElement(widgetManifest[this.props.widget.type], { data: this.props.widget.data.results, widget: this.props.widget })}
      </Card>
    )
  }
  
  render(){
    return (
      <div className="BaseWidget" style={{ width: widgetSize(this.props.widget.width) }}>
        {this.getWidget()}
      </div>
    )
  }

}
