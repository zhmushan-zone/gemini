import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import OpinionRecommend from '../opinionRecommend/opinionRecommend'
import './opinionSideBar.scss'
@withRouter
export default class opinionSideBar extends Component {
	render() {
		const catalogue = [
			{
				name: '推荐',
				to: '/opinion',
				is: this.props.location.pathname === '/opinion',
				component: OpinionRecommend
			},
			{
				name: '关注',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '资讯',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '最新新闻',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '区块链',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '人工智能',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '云计算、大数据',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '前端开发',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '后端开发',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '区块链',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			},
			{
				name: '其他',
				to: '/opinion',
				is: this.props.location.pathname === '/a',
				component: OpinionRecommend
			}
		]
		return (
			<div className="side-bar-container">
				<ul className='left_menu'>
					{catalogue.map((v) => {
						return (
							<li className={`m_item ${v.is ? 'active' : ''}`}>
								<a href={v.to}>{v.name}</a>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
