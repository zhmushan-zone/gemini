import React, { Component } from 'react'
import './coursePreview.scss'
import { Icon, Button } from 'antd'
import Share from '@/share'
export default class CoursePreview extends Component {
	render() {
		return (
			<div className='course-class-infos-container'>
				<div className='course-class-infos'>
					<div className='w'>
						<div className='path'>
							<a href='/'>实战</a>
							<i className='path-split'>\</i>
							<span>SpringBoot 仿抖音短视频小程序开发 全栈式实战项目</span>
						</div>
						<div className='extra'>
							<div className='course-collect'>
								<Icon type='star' />
								<span>收藏</span>
							</div>
							<div className='page-share'>
								<a onClick={() => Share.shareToQQZone('title', `/article/1/`)}>
									<Icon type='qq' color='#b6b9bc' size={26} />
								</a>
								<a onClick={() => Share.shareToDouban('title', `/article/2/`)}>
									<Icon type='douban_F' color='#b6b9bc' size={24} />
								</a>
								<a onClick={() => Share.shareToWeibo('title', `/article/2/`)}>
									<Icon type='weibo' color='#b6b9bc' size={24} />
								</a>
							</div>
						</div>
					</div>
					<div className='info-warp'>
						<div className='title-box'>
							<h1>
								Java仿抖音短视频小程序开发<br />全栈式实战项目
							</h1>
							<h2>从前端到后台，从开发到上线，带你玩转小程序全栈开发</h2>
						</div>
						<div className='splitline' />
						<div className='info-bar'>
							<div className='statics'>
								<span>难度中级</span>
								<span>时长17小时</span>
								<span>学习人数629</span>
								<span>综合评分10.00分</span>
							</div>
						</div>
					</div>
					<div className='study-button'>
						<Button type='primary' size={'large'}>
							去学习
						</Button>
					</div>
				</div>
				<div className='course-infos-t'>
					<ul>
						<li>12</li>
					</ul>
				</div>
			</div>
		)
	}
}
