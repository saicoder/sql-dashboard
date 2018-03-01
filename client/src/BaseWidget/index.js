import React from 'react'

import Card from '../Card'
import './BaseWidget.css'
import widgetManifest from '../widgets/manifest'

const baseWidth = 100 / 12
const widgetSizeStyle = (_size = 1) => `${baseWidth * parseInt(_size, 10)}%`

const loadingWidget = (widget) => (
  <div className="BaseWidget" style={{ width: widgetSizeStyle(widget.width) }}>
    <Card title={widget.name || 'Unnamed'} loading />
  </div>
)

export default class BaseWidget extends React.Component {
  state = { data: null, loading: true }
  
  reloadInterval = null

  componentWillUnmount(){ clearInterval(this.reloadInterval) }

  componentDidMount(){
    this.loadData()

    const reload = parseInt(this.props.widget.reload, 10) || 0
    if (reload > 0) this.reloadInterval = setInterval(this.loadData.bind(this), reload * 1000)
  }

  loadData(){
    fetch(`/api/widgets/${this.props.widget.id}/exec`)
      .then((res) => res.json())
      .then((data) => this.setState({ data, loading: false }))
  }

  render(){
    if (this.state.loading) return loadingWidget(this.props.widget)

    return (
      <div className="BaseWidget" style={{ width: widgetSizeStyle(this.props.widget.width) }}>
        {React.createElement(widgetManifest[this.props.widget.type], { data: this.state.data.results, widget: this.props.widget })}
      </div>
    )
  }
}
