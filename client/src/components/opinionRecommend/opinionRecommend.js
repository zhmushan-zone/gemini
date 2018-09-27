/**
 * 推荐页
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import Cookies from 'js-cookie'
import axios from 'axios'
import { fetchArticleAll } from '@/redux/actions.js'

@connect((state) => state, { fetchArticleAll })
export default class opinionRecommend extends Component {
	constructor(props) {
		super(props)
		this.state = {
			watchTags: [],
		}
	}
	componentDidMount = async () => {
		var _id = Cookies.get('_id')
		if (_id) {
			axios
				.get(`/api/users/${_id}`)
				.then(async (res) => {
					this.setState({
						watchTags: res.data.data.watchTags,
					})
				})
				.catch((rej) => {
					console.log(rej)
				})
		}
		// 获取所有文章
		await this.props.fetchArticleAll()
		const token = Cookies.get('_token')
		let { watchTags } = this.state
		if (watchTags && watchTags.length !== 0) {
			for (let index = 0; index < watchTags.length; index++) {
				console.log(watchTags[index])
				await axios({
					method: 'put',
					url: `/api/users/watch/article-type/${watchTags[index]}`,
					headers: {
						token: token,
					},
				}).then((res) => {
					// console.log(res)
				})
			}
		}
	}
	render() {
		return (
			<div className='opinion-container'>
				<div className='opinionMain-container'>
					<OpinionSideBar />
					<OpinionMainCenter />
					<OpinionMainRight />
				</div>
			</div>
		)
	}
}
