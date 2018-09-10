import React, { Component } from 'react'
import OpinionNav from '../opinionNav/opinionNav'
import ArticleLeft from '../articleLeft/articleLeft'
import ArticleRight from '../articleRight/articleRight'
import { connect } from 'react-redux'
import { fetchArticleOne, fetchArticleAll,focusUser } from '@/redux/actions'
import { withRouter } from 'react-router-dom'
import './articleSample.scss'
@withRouter
@connect((state) => state, { fetchArticleOne, fetchArticleAll,focusUser })
export default class ArticleSample extends Component {
	componentDidMount = async() => {
		await this.props.fetchArticleOne(this.props.match.params.id)
		await this.props.fetchArticleAll()

	}
	render() {
		const {userstatus} = this.props
		const { articleArray, article } = this.props.article
		const { authorId } = this.props.article.article
		return (
			<React.Fragment>
				<OpinionNav />
				<div className='article-container'>
					{articleArray ? <ArticleLeft {...article} articleData={articleArray}  /> : null}
					{authorId&&article ? <ArticleRight authorId={article.authorId} article={article} focusUser={(authorId)=>this.props.focusUser(authorId)} watchUsersId={userstatus.watchUsersId} job={userstatus.job}/> : null}
				</div>
			</React.Fragment>
		)
	}
}
