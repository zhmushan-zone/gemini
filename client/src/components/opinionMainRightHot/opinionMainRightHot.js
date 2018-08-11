import React, { Component } from 'react'
import OpinionMainRightHotArticleList from '../opinionMainRightHotArticleList/opinionMainRightHotArticleList'
import './opinionMainRightHot.scss'
export default class opinionMainRightHot extends Component {
	render() {
		const test = [ 1, 2, 3, 4, 5, 6, 7, 8 ]
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
				<div className='recommended_author'>
					<div className='top'>
						<h3>推荐作者</h3>
						<div className='more'>更多</div>
					</div>
					<ul className='personList'>
						<li className='person'>
							<div className='left'>
								<div className='imgCon'>
									<img src='https://img2.mukewang.com/5b696b9f00012c1a20002000-200-200.jpg' alt='' />
								</div>
								<p className='text_author'>
                  <div className="name">啊麻烦的</div>
                  <p>
                    <span>40篇文章</span>
                    <span>130个推荐</span>
                  </p>
                </p>
							</div>
							<div className='right'>
								<button className="follow">关注</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
