import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/stores'
import App from './components/App'
import './index.scss'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.Fragment>
				<App />
			</React.Fragment>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
