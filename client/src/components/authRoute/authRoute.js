import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
/* 引入后就能变成路由组件 */
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '@/redux/actions'
@withRouter
@connect((state) => state, { loadData })
class AutoRoute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	stateChange() {
		this.props.stateChange()
	}
	componentDidMount() {
		var publicList = [ '/login' ]
		var pathname = this.props.location.pathname
		var _id = Cookies.get('_id')
		var _token = Cookies.get('_token')
		if (publicList.indexOf(pathname) !== -1) {
			return null
		}

		axios
			.get('/api/users/auth', {
				headers: {
					id: _id,
					token: _token,
				},
			})
			.then(async (res) => {
				await this.props.loadData(res.data.data)
				Cookies.set('_token', res.data.data.token)
				this.stateChange()
			})
			.catch((rej) => {
				this.props.history.push('/login')
			})
	}

	render() {
		return null
	}
}
export default AutoRoute
