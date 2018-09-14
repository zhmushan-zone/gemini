import React, { Component } from 'react'
import './opinionMainCenter.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchArticleByCategory } from '@/redux/actions'
import FetchArticleList from '../fetchArticleList/fetchArticleList'
import OpinionBanner from '../opinionBanner/opinionBanner'
import OpinionFocusSelect from '../opinionFocusSelect/opinionFocusSelect'
@withRouter
@connect((state) => state, { fetchArticleByCategory })
export default class opinionMainCenter extends Component {
	async componentWillReceiveProps(nextProps) {
		if (this.props.match.params.category !== nextProps.match.params.category) {
			const category = nextProps.match.params.category
			this.props.fetchArticleByCategory(category)
		}
	}
	render() {
		let articleData
		if (this.props.article.articleArray.length !== 0) {
			articleData = this.props.article.articleArray
		} else if (this.props.articleArray) {
			articleData = this.props.articleArray
		}
		const pathname = this.props.history.location.pathname
		return (
			<div className='opinion-main-center-container'>
				{/* 关注 */}
				{pathname === '/opinion/focus' ? <OpinionFocusSelect /> : null}
				{pathname === '/opinion' ? <OpinionBanner /> : null}
				{articleData ? <FetchArticleList articleData={articleData} /> : null}
			</div>
		)
	}
}
