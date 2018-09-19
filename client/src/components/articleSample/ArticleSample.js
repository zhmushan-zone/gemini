import React, { Component } from 'react'
import OpinionNav from '../opinionNav/opinionNav'
import ArticleLeft from '../articleLeft/articleLeft'
import ArticleRight from '../articleRight/articleRight'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchArticleOne, fetchArticleAll, focusUser } from '@/redux/actions'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './articleSample.scss'
@withRouter
@connect((state) => state, { fetchArticleOne, fetchArticleAll, focusUser })
export default class ArticleSample extends Component {
	constructor(props) {
		super(props)
		this.state = {
			article: '',
		}
	}
	async fetchOne() {
		// fetch one
		const res = await axios({
			method: 'get',
			url: `/api/articles/${this.props.match.params.id}`,
		})
		console.log(res.data.code)
		if (res.data.code === 1) {
			Cookies.set('commentsId', res.data.data.commentsId)
			this.setState({
				article: res.data.data,
			})
		} else {
			console.log('后端出错了')
		}
	}
	componentDidMount = async () => {
		await this.fetchOne()
		await this.props.fetchArticleAll()
	}
	async changeDate() {
		await this.fetchOne()
		await this.props.fetchArticleAll()
	}
	render() {
		const { userstatus } = this.props
		const { articleArray } = this.props.article
		const { article } = this.state
		const { authorId } = article
		return (
			<React.Fragment>
				<OpinionNav />
				<div className='article-container'>
					{articleArray && article ? <ArticleLeft thisArticle={article} articleData={articleArray} /> : null}
					{authorId && article ? (
						<ArticleRight
							authorId={article.authorId}
							article={article}
							focusUser={(authorId) => this.props.focusUser(authorId)}
							watchUsersId={userstatus.watchUsersId}
							job={userstatus.job}
							changeDate={this.changeDate.bind(this)}
						/>
					) : null}
				</div>
			</React.Fragment>
		)
	}
}
