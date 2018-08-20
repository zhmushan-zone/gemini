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
				to: '/opinion/follow',
				is: this.props.location.pathname === '/opinion/follow',
				component: OpinionRecommend
			},
			{
				name: '资讯',
				to: '/opinion/information',
				is: this.props.location.pathname === '/opinion/information',
				component: OpinionRecommend
			},
			{
				name: '最新新闻',
				to: '/opinion/new',
				is: this.props.location.pathname === '/opinion/new',
				component: OpinionRecommend
			},
			{
				name: '区块链',
				to: '/opinion/blockchain',
				is: this.props.location.pathname === '/opinion/blockchain',
				component: OpinionRecommend
			},
			{
				name: '人工智能',
				to: '/opinion/ai',
				is: this.props.location.pathname === '/opinion/ai',
				component: OpinionRecommend
			},
			{
				name: '云计算/大数据',
				to: '/opinion/clouddata',
				is: this.props.location.pathname === '/opinion/clouddata',
				component: OpinionRecommend
			},
			{
				name: '前端开发',
				to: '/opinion/front',
				is: this.props.location.pathname === '/opinion/front',
				component: OpinionRecommend
			},
			{
				name: '后端开发',
				to: '/opinion/back',
				is: this.props.location.pathname === '/opinion/back',
				component: OpinionRecommend
			},
			{
				name: '其他',
				to: '/opinion/others',
				is: this.props.location.pathname === '/opinion/others',
				component: OpinionRecommend
			}
		]
		return (
			<div className="side-bar-container">
				<ul className='left_menu'>
					{catalogue.map((v,i) => {
						return (
							<li className={`m_item ${v.is ? 'active' : ''}`} key={i}>
								<a href={v.to}>{v.name}</a>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
