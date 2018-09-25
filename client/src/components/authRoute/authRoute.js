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

	componentDidMount() {
		var _id = Cookies.get('_id')
		axios
			.get(`/api/users/${_id}`)
			.then(async (res) => {
				await this.props.loadData(res.data.data)
			})
			.catch((rej) => {
				console.log(rej)
			})
	}

	render() {
		return null
	}
}
export default AutoRoute
