import React, { Component } from 'react'
import './opinionMainRightHotArticleList.scss'
export default class opinionMainRightHotArticleList extends Component {
	render() {
		return (
			<div className="hot-article-list-li">
				<li className='item'>
					<div className='imgCon'>
						<img src='https://img2.mukewang.com/5b696b9f00012c1a20002000-200-200.jpg' alt='' />
					</div>
					<p className='text'>有奖征文007期 | 大家都见过/写过哪些让你虎躯一震的代码？</p>
				</li>
			</div>
		)
	}
}
