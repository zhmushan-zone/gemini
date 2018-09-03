
/**
 * 推荐页
 */
import React, { Component } from 'react'
import OpinionNav from '../opinionNav/opinionNav'
import { connect } from 'react-redux'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import { fetchArticleAll } from '@/redux/actions.js'

@connect((state) => state, { fetchArticleAll })
export default class opinionRecommend extends Component {
	componentDidMount = () => {
		// 获取所有文章
		this.props.fetchArticleAll()
	}
	render() {
		return (
			<div className='opinion-container'>
				<OpinionNav />
				<div className='opinionMain-container'>
					<OpinionSideBar />
					<OpinionMainCenter />
					<OpinionMainRight />
				</div>
			</div>
		)
	}
}
