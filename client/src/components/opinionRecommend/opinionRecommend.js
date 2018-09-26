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
	componentDidMount = async () => {
		// 获取所有文章
		await this.props.fetchArticleAll()
		const watchTag = JSON.parse(Cookies.get('tags'))
		const token = Cookies.get('_token')
		if (watchTag && watchTag.length !== 0) {
			for (let index = 0; index < watchTag.length; index++) {
				console.log(watchTag[index])
				await axios({
					method: 'put',
					url: `/api/users/watch/article-type/${watchTag[index]}`,
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
