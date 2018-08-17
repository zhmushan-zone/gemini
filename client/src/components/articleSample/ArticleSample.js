import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticleOne } from '@/redux/actions'
import OpinionNav from '../opinionNav/opinionNav'
import ArticleLeft from '../articleLeft/articleLeft'
import ArticleRight from '../articleRight/articleRight'
import './articleSample.scss'
@connect((state) => state.article, { fetchArticleOne })
export default class ArticleSample extends Component {
	componentWillMount = () => {
		this.props.fetchArticleOne(this.props.match.params.id)
	}
	render() {
		try {
			var { title, coverImg, authorId, type } = this.props.article
		} catch (error) {}
		return (
			<React.Fragment>
				<OpinionNav />
				<div className='article-container'>
					<ArticleLeft />
					<ArticleRight />
				</div>
			</React.Fragment>
		)
	}
}
