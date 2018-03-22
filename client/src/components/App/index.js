import './App.css'

import React, { Component } from 'react'

import { Icon, Button, Dropdown, Menu, Spin } from 'antd'
import { connect } from 'react-redux'

import { toggleFullScreen, loadWidgets, requestDataFetch } from '../../ducks/app'
import BaseWidget from '../BaseWidget'


class App extends Component {

  componentDidMount(){ this.props.loadWidgets() }

  render() {
    if (this.props.loading) return <div className="App__widgets loading"><Spin size="large" /></div>
    
    return (
      <div className="App__widgets">
        <h2 className="title">
          <Icon type="api" />
          {' '}
          Data Dash

          <Dropdown overlay={
            <Menu onClick={({ key }) => this.props[key]()}>
              <Menu.Item key="toggleFullScreen">{this.props.fullScreen ? 'Exit Full Screen' : 'Full Screen'}</Menu.Item>
              {/* <Menu.Item key="2">Admin Mode</Menu.Item> */}
            </Menu>
          }>
            <Button type="dashed" style={{ float: 'right', background: 'transparent', padding: '0 5px', height: '24px' }}>
              <Icon type="down" />
            </Button>
          </Dropdown>
        </h2> 

        {this.props.widgets.map((t, i) =>
          <BaseWidget widget={Object.assign({},t, { id: i })} requestDataFetch={this.props.requestDataFetch.bind(null, i)} key={i} />
        )}
      </div>
    )
  }
}

export default connect((state) => ({
  fullScreen: state.app.fullScreen,
  loading: state.app.loading,
  widgets: state.app.widgets,
}), {
  toggleFullScreen,
  loadWidgets,
  requestDataFetch
})(App)

