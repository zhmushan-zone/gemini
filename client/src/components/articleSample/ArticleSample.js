import React, { Component } from 'react'

import OpinionNav from '../opinionNav/opinionNav'
import ArticleLeft from '../articleLeft/articleLeft'
import ArticleRight from '../articleRight/articleRight'
import { connect } from 'react-redux'
import { fetchArticleOne, fetchArticleAll } from '@/redux/actions'
import { withRouter } from 'react-router-dom'
import './articleSample.scss'
@withRouter
@connect((state) => state.article, { fetchArticleOne, fetchArticleAll })
export default class ArticleSample extends Component {
	componentDidMount = () => {
		this.props.fetchArticleOne(this.props.match.params.id)
		this.props.fetchArticleAll()
	}
	render() {
		const { articleArray, article } = this.props
		const { authorId } = this.props.article
		return (
			<React.Fragment>
				<OpinionNav />
				<div className='article-container'>
					{articleArray ? <ArticleLeft {...this.props.article} articleData={articleArray}  /> : null}
					{authorId&&article ? <ArticleRight authorId={this.props.article.authorId} article={article}/> : null}
				</div>
			</React.Fragment>
		)
	}
}
