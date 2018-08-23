import React, { Component } from 'react'
import './opinionMainCenter.scss'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchArticleAll } from '@/redux/actions'
import FetchArticleList from '../fetchArticleList/fetchArticleList'
import OpinionBanner from '../opinionBanner/opinionBanner'
@withRouter
@connect((state) => state, { fetchArticleAll })
export default class opinionMainCenter extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentWillMount() {
		this.props.fetchArticleAll()
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
