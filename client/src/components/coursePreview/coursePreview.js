import React, { Component } from 'react'
import './coursePreview.scss'
import { Tabs, Input } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import { getVideoComment } from '@/redux/actions.js'
import { Rate } from 'antd'
import Share from '@/share'
import axios from 'axios'
import { defaultAvatar } from '@/const'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router'
const TabPane = Tabs.TabPane
const { TextArea } = Input
@withRouter
@connect((state) => state, { getVideoComment })
export default class CoursePreview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			courseId: this.props.match.params.courseId,
			course: {},
			summary: '',
			rate: '',
		}
	}
	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
	}
	async componentDidMount() {
		// 获取课程
		await axios({
			method: 'GET',
			url: `/api/courses/${this.state.courseId}`,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				course: res.data.data,
			})
			Cookies.set('video-commentsId', res.data.data.commentsId)
		})
	}
	callback(key) {
		console.log(key)
	}
	render() {
		const { course } = this.state
		const { sections } = course
		const { video } = this.props
		const comment = video.comment
		const difficulty = [ '初级', '中级', '高级' ]
		console.log(course)
		return (
			<div className='course-class-infos-container'>
				<div className='course-class-infos'>
					<div className='w'>
						<div className='path'>
							<a href='/'>实战</a>
							<i className='path-split'>\</i>
							<span>{course.title}</span>
						</div>
						<div className='extra'>
							<div className='page-share'>
								<a onClick={() => Share.shareToQQZone(course.title, `/class/1/`)}>
									<CustomIcon type='qq' color='#b6b9bc' size={26} />
								</a>
								<a onClick={() => Share.shareToDouban(course.title, `/class/2/`)}>
									<CustomIcon type='douban_F' color='#b6b9bc' size={24} />
								</a>
								<a onClick={() => Share.shareToWeibo(course.title, `/class/2/`)}>
									<CustomIcon type='weibo' color='#b6b9bc' size={24} />
								</a>
							</div>
						</div>
					</div>
					<div className='info-warp'>
						<div className='title-box'>
							<h1>{course.title}</h1>
						</div>
						<div className='splitline' />
						<div className='info-bar'>
							<div className='statics'>
								<div className='info-author'>
									<img src={course.authorAvatar ? `/avatar/${course.authorAvatar}` : defaultAvatar} alt='' />
									<span>{course.authorUsername}</span>
								</div>
								<span>难度{difficulty[course.difficulty]}</span>
								<span>时长17小时</span>
								<span>学习人数629</span>
								<span>综合评分{course.rate}分</span>
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
							{sections ? (
								sections.map((v, i) => (
									<div className='chapter course-wrap' key={v.title}>
										<ul className='video'>
											<li>{`第${i + 1}章- ` + v.title}</li>
											{v.nodes ? (
												<React.Fragment>
													{v.nodes.map((b, j) => {
														return (
															<li
																key={b.title}
																className='hover'
																onClick={() => {
																	this.handleSee(b.video)
																}}
															>
																<CustomIcon type={'video02'} size={16} className='video-logo' />
																{`${i + 1}-${j + 1}- ` + b.title}
															</li>
														)
													})}
												</React.Fragment>
											) : null}
										</ul>
									</div>
								))
							) : null}
						</TabPane>
						<TabPane tab='课程评论' key='2'>
							{comment ? (
								comment.map((v) => {
									return (
										<div className='comment-item' key={v.id}>
											<div className='avatar'>
												<img src={v.authorAvatar ? `/avatar/${v.authorAvatar}` : defaultAvatar} alt='' />
											</div>
											<div className='content'>
												<a href='' className='username' style={{ color: '#93999f' }}>
													{v.authorUsername}
												</a>
												<p>{v.content}</p>
												<p>{v.createAt}</p>
											</div>
										</div>
									)
								})
							) : null}
						</TabPane>
						<TabPane tab='用户评价' key='3'>
							<div className='evaluation-info'>
								<div className='evaluation-title'>综合评分</div>
								<div className='evaluation-score'>5.0</div>
								<Rate disabled defaultValue={5} />
							</div>
							<div className='evaluate'>
								<div className='your'>
									<h2>请输入您的评分</h2>
									<Rate allowHalf defaultValue={0} onChange={(num) => this.stateChange.bind(this, 'rate')} />
								</div>
								<div className='evaluate-item'>
									<div className='avatar'>
										<img src={defaultAvatar} alt='' />
									</div>
									<div className='your-evalute'>
										<TextArea
											rows={4}
											defaultValue={'请输入你的总结'}
											value={this.state.summary}
											onChange={this.stateChange.bind(this, 'summary')}
										/>
									</div>
								</div>
								<p className='send-evaluate-p'>
									<div className='send-evaluate'>发表</div>
								</p>
							</div>
							<div className='evaluation-item'>
								<div className='avatar'>
									<img src={defaultAvatar} alt='' />
								</div>
								<div className='content'>
									<div className='top'>
										<span>shoukailiang</span>
										<Rate disabled defaultValue={0} />
									</div>
									<div className='con'>
										<p>正好看</p>
									</div>
									<div className='time'>
										<span>1997</span>
									</div>
								</div>
							</div>
						</TabPane>
					</Tabs>,
				</div>
			</div>
		)
	}
}
