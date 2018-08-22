import React, { Component } from 'react'

import OpinionNav from '../opinionNav/opinionNav'
import ArticleLeft from '../articleLeft/articleLeft'
import ArticleRight from '../articleRight/articleRight'
import { connect } from 'react-redux'
import { fetchArticleOne,fetchArticleAll} from '@/redux/actions'
import { withRouter } from 'react-router-dom'
import './articleSample.scss'
@withRouter
@connect((state) => state.article, { fetchArticleOne,fetchArticleAll })
export default class ArticleSample extends Component {
	componentWillMount = () => {
		this.props.fetchArticleOne(this.props.match.params.id)
		this.props.fetchArticleAll()
	}
	render() {
		try {
			if(this.props.articleArray){
				console.log('object')
				var articleData=this.props.articleArray
			}
		} catch (error) {
			
		}
		return (
			<React.Fragment>
				<OpinionNav />
				<div className='article-container'>
					<ArticleLeft {...this.props.article} articleData={articleData}/>
					<ArticleRight />
				</div>
			</React.Fragment>
		)
	}
}
