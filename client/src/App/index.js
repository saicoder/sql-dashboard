import 'whatwg-fetch'

import React, { Component } from 'react'
import './App.css'

import BaseWidget from '../BaseWidget'

export default class App extends Component {
  state = { loading: true, widgets: [] }

  componentDidMount(){
    fetch('/api/widgets')
      .then((res) => res.json())
      .then((widgets) => this.setState({ widgets, loading: false }))
  }

  render() {
    if (this.state.loading) return <h2>Loading</h2>
    
    return (
      <div className="App__widgets">
        {this.state.widgets.map((t, i) =>
          <BaseWidget widget={Object.assign({},t, { id: i })} key={i} />
        )}
      </div>
    )
  }
}

