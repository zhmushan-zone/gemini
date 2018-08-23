import React, { Component } from 'react'
import './opinionMainCenter.scss'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchArticleByCategory } from '@/redux/actions'
import FetchArticleList from '../fetchArticleList/fetchArticleList'
import OpinionBanner from '../opinionBanner/opinionBanner'
@withRouter
@connect((state) => state, { fetchArticleByCategory })
export default class opinionMainCenter extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.category !== nextProps.match.params.category) {
			const category = this.props.match.params.category
			this.props.fetchArticleByCategory(category)
		}
	}
	render() {
		const articleData = this.props.article.articleArray
		const pathname = this.props.history.location.pathname
		return (
			<div className='opinion-main-center-container'>
				{pathname === '/opinion/0' ? <OpinionBanner /> : null}
				<FetchArticleList articleData={articleData} />
			</div>
		)
	}
}
