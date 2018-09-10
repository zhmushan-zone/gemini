import React, { Component } from 'react'
import './opinionMainRightHotArticleList.scss'
import { withRouter } from 'react-router'
@withRouter
export default class opinionMainRightHotArticleList extends Component {
	render() {
		const {coverImg,to,title} = this.props
		return (
			<div className='hot-article-list-li'>
				<li className='item'>
					<div className='imgCon'>
					{
						coverImg?<img src={`/cover-img/${coverImg}`} alt='' />:null
					}
						
					</div>
					<p className='text' onClick={()=>this.props.history.push(`/article/${to}`)}>
						{title}
					</p>
				</li>
			</div>
		)
	}
}
