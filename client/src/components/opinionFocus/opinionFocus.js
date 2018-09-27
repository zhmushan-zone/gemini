/**
 * 文章focus
 */
import React, { Component } from 'react'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import Loading from '@/common/loading/loading'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { fetchArticleAll } from '@/redux/actions.js'

@connect((state) => state.userstatus, { fetchArticleAll })
export default class opinionFocus extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleArray: [],
			show: true,
			watchTags: [],
		}
	}
	componentDidMount = async () => {
		var _id = Cookies.get('_id')
		const token = Cookies.get('_token')
		if (_id) {
			await axios
				.get(`/api/users/${_id}`)
				.then(async (res) => {
					this.setState({
						watchTags: res.data.data.watchTags,
					})
				})
				.catch((rej) => {
					console.log(rej)
				})
			// 获取关注的所有文章
			let { watchTags } = this.state
			if (watchTags && watchTags.length !== 0) {
				for (let index = 0; index < watchTags.length; index++) {
					await axios({
						method: 'put',
						url: `/api/users/watch/article-type/${watchTags[index]}`,
						headers: {
							token: token,
						},
					}).then((res) => {})
				}
				// 关注tag
				await axios({
					method: 'get',
					url: '/api/articles/watch-article-type',
					headers: {
						token: token,
					},
				}).then((res) => {
					this.setState({
						articleArray: res.data.data,
						show: false,
					})
				})
			} else {
				this.setState({
					show: false,
				})
			}
		} else {
			this.setState({
				show: false,
			})
		}
	}

	render() {
		return (
			<div className='opinion-container'>
				{this.state.show ? <Loading /> : null}
				<div className='opinionMain-container'>
					<OpinionSideBar />
					<OpinionMainCenter articleArray={this.state.articleArray} />
					<OpinionMainRight />
				</div>
			</div>
		)
	}
}
