import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducer'
import App from './components/App'
import "./index.scss"
//compose对几个函数进行组合
const store = createStore(reducers, compose(
  //异步要用的中间件
  applyMiddleware(thunk),
  //调试工具
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
