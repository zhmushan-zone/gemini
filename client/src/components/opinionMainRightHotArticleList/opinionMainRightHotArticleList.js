import React, { Component } from 'react'
import './opinionMainRightHotArticleList.scss'
import { Link } from 'react-router-dom'
export default class opinionMainRightHotArticleList extends Component {
	render() {
		return (
			<div className='hot-article-list-li'>
				<li className='item'>
					<div className='imgCon'>
						<img src='https://img2.mukewang.com/5b696b9f00012c1a20002000-200-200.jpg' alt='' />
					</div>
					<p className='text'>
						<Link to={"/article/"+this.props.to}>{this.props.title}</Link>
					</p>
				</li>
			</div>
		)
	}
}
