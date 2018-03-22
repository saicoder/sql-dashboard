import 'whatwg-fetch'
import 'antd/dist/antd.css'
import './index.css'


import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import ducks from './ducks'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(ducks, composeEnhancers(
  applyMiddleware(thunk)
))

const root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))
registerServiceWorker()
