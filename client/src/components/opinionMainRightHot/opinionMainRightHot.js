import React, { Component } from 'react'
import OpinionMainRightHotArticleList from '../opinionMainRightHotArticleList/opinionMainRightHotArticleList'
import './opinionMainRightHot.scss'
export default class opinionMainRightHot extends Component {
	render() {
		const test = [ 1, 2, 3, , 4, 5, 6, 7, 8 ]
		return (
			<div className='hot_article-container'>
				<div className='top'>
					<h3>热门文章</h3>
					<div className='more'>更多</div>
				</div>
				<ul className='hot-article-list'>
					{test.map((v) => {
						return <OpinionMainRightHotArticleList key={v} />
					})}
				</ul>
			</div>
		)
	}
}
