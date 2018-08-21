import React, { Component } from 'react'
import { Icon } from 'antd'
import CoursePreview from '@/common/coursePreview/coursePreview'
import './articleRight.scss'
import {defaultAvatar} from  '@/const'
import { connect } from 'react-redux'
@connect((state) => state)
export default class articleLeft extends Component {
	constructor(props){
		super(props)
		this.state={
			follow:false
		}	
	}
	toFollow = () => {
		this.setState({
			follow:!this.state.follow
		})
	}

	render() {
		return (
			<div className='right-article-container'>
				<div className='author_info'>
					<img src={defaultAvatar} alt='' />
					<div className='text-info'>
						<div className='name'>
							<span>{this.props.User.nickname||this.props.User.username}</span>
							<span onClick={this.toFollow}>{this.state.follow?"已关注":"关注"}</span>
						</div>
						<div className='job'>全站工程师</div>
						<div className='contribution'>
							<span>68片文章</span>
							<span>贡献55555字</span>
						</div>
					</div>
				</div>
				<div className='other_article'>
					<div className='head'>
						<h2 className='title'>作者相关文章</h2>
						<span className='more'>更多</span>
					</div>
					<ul className='content'>
						<li className='article-item'>
							<Icon type='file-text' />非常重要，小公司面试防坑指南！
						</li>
						<li className='article-item'>
							<Icon type='file-text' />非常重要，小公司面试防坑指南！
						</li>
						<li className='article-item'>
							<Icon type='file-text' />非常重要，小公司面试防坑指南！
						</li>
						<li className='article-item'>
							<Icon type='file-text' />非常重要，小公司面试防坑指南！
						</li>
					</ul>
				</div>

				<div className='related-lessons'>
					{courses.map((item, index) => {
						return (
							<CoursePreview
								name={item.name}
								level={item.level}
								viewerCount={item.viewerCount}
								rate={item.rate}
								price={item.price}
								img={item.img}
								key={index}
							/>
						)
					})}
				</div>
			</div>
		)
	}
}

const courses = [
	{
		name: '区块链入门与去中心化应用实战',
		level: '中级',
		viewerCount: 4236,
		rate: 4.8,
		price: 100,
		img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg'
	},
	{
		name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目',
		level: '中级',
		viewerCount: 4236,
		rate: 3.0,
		price: 100,
		img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg'
	},
	{
		name: 'Java仿抖音短视频小程序开发 全栈式实战项目',
		level: '中级',
		viewerCount: 4236,
		rate: 3.4,
		price: 100,
		img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg'
	},
	{
		name: 'React Native技术精讲与高质量上线APP开发',
		level: '中级',
		viewerCount: 4236,
		rate: 4.1,
		price: 100,
		img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg'
	}
]
