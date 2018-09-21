/**
 * 推荐页
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import { fetchArticleAll } from '@/redux/actions.js'

@connect((state) => state, { fetchArticleAll })
export default class opinionRecommend extends Component {
	componentDidMount = async () => {
		// 获取所有文章
		await this.props.fetchArticleAll()
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
