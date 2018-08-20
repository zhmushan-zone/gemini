import React, { Component } from 'react'

import OpinionNav from '../opinionNav/opinionNav'
import ArticleLeft from '../articleLeft/articleLeft'
import ArticleRight from '../articleRight/articleRight'
import './articleSample.scss'
export default class ArticleSample extends Component {
	render() {

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
