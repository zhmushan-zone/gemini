import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
    <BrowserRouter>
      <React.Fragment>
        {/* 有了switch后，匹配到path后就不会再匹配下去了 */}
        <Switch>
          <Route path="/" component={App}></Route>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
