/**
 * 文章focus
 */
import React, { Component } from 'react'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
@connect((state) => state, {})
export default class opinionFocus extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleArray: [],
		}
	}
	componentDidMount = async () => {
		// 关注tag

		const token = Cookies.get('_token')

		await axios({
			method: 'get',
			url: '/api/articles/watch-article-type',
			headers: {
				token: token,
			},
		}).then((res) => {
			this.setState({
				articleArray: res.data.data,
			})
		})
		console.log(this.state.articleArray)
	}

	render() {
		return (
			<div className='opinion-container'>
				<div className='opinionMain-container'>
					<OpinionSideBar />
					<OpinionMainCenter articleArray={this.state.articleArray} />
					<OpinionMainRight />
				</div>
			</div>
		)
	}
}
