import React, { Component } from 'react'
import OpinionMainRightHotArticleList from '../opinionMainRightHotArticleList/opinionMainRightHotArticleList'
import OpinionMainRightHotPerson from '../opinionMainRightHotPerson/opinionMainRightHotPerson'
import './opinionMainRightHot.scss'
import { hotSort } from '@/util/hotSort'
export default class opinionMainRightHot extends Component {
	render() {
		return (
			<div className='hot_article-container'>
				<div className='top'>
					<h3>热门文章</h3>
					{/* <div className='more'>更多</div> */}
				</div>
				<ul className='hot-article-list'>
					{hotSort(this.props.artcileArray).map((v, i) => {
						if (i < 10) {
							return <OpinionMainRightHotArticleList coverImg={v.coverImg} key={v.id} title={v.title} to={v.id}/>
						}
					})}
				</ul>
				<div className='person-list'>
					<OpinionMainRightHotPerson />
				</div>
			</div>
		)
	}
}
