import React, { Component } from 'react'
import './coursePreview.scss'
import { Tabs } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import { Icon, Button } from 'antd'
import Share from '@/share'
import { defaultAvatar } from '@/const'
const TabPane = Tabs.TabPane
export default class CoursePreview extends Component {
	callback(key) {
		console.log(key)
	}
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
							<div className='page-share'>
								<a onClick={() => Share.shareToQQZone('title', `/article/1/`)}>
									<CustomIcon type='qq' color='#b6b9bc' size={26} />
								</a>
								<a onClick={() => Share.shareToDouban('title', `/article/2/`)}>
									<CustomIcon type='douban_F' color='#b6b9bc' size={24} />
								</a>
								<a onClick={() => Share.shareToWeibo('title', `/article/2/`)}>
									<CustomIcon type='weibo' color='#b6b9bc' size={24} />
								</a>
							</div>
						</div>
					</div>
					<div className='info-warp'>
						<div className='title-box'>
							<h1>Java仿抖音短视频小程序开发全栈式实战项目</h1>
						</div>
						<div className='splitline' />
						<div className='info-bar'>
							<div className='statics'>
								<div className='info-author'>
									<img src={defaultAvatar} alt='' />
									寿恺梁
								</div>
								<span>难度中级</span>
								<span>时长17小时</span>
								<span>学习人数629</span>
								<span>综合评分10.00分</span>
							</div>
						</div>
					</div>
				</div>

				<div className='course-content'>
					<div className='course-aside-info'>
						<div className='learn-btn'>
							<button>开始学习</button>
						</div>
						<div className='course-info-tip'>
							<dl className='first'>
								<dt>课程须知</dt>
								<dd>1、了解 Unity3D引擎基本操作</dd>
								<dd>2、了解基本 C#语法</dd>
							</dl>
							<dl>
								<dt>老师告诉你能学到什么？</dt>
								<dd>1、Rigidbody组件的面板属性</dd>
								<dd>2、了解基本 C#语法</dd>
								<dd>2、了解基本 C++语法</dd>
							</dl>
							<dl />
						</div>
					</div>
					<Tabs defaultActiveKey='1' onChange={this.callback} size='large' className='tab-course-preview'>
						<TabPane tab='课程章节' key='1'>
							<div className='chapter'>
								<div className='course-description'>简介：讲解 Rigidbody 组件和触发器的基础使用方法，串联讲解的内容，完成平衡球小游戏的制作，同时了解各种陷阱制作。</div>
							</div>
							<div className='chapter course-wrap'>
								<h3>第1章 课程介绍与面板属性</h3>
							<div className="video"></div>

							</div>
						</TabPane>
						<TabPane tab='问答评论' key='2'>
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab='用户评价' key='3'>
							Content of Tab Pane 3
						</TabPane>
					</Tabs>,
				</div>
			</div>
		)
	}
}
