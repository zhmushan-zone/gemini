import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import store from './redux/stores'
import App from './components/App'
import "./index.scss"

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
