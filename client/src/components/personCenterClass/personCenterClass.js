import React from 'react'
import { Tabs, message } from 'antd'
import './personCenterClass.scss'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchUser } from '@/redux/actions'
const TabPane = Tabs.TabPane
@withRouter
@connect((state) => state, { fetchUser })
class PersonCenterClass extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			courses: [],
			userId: this.props.match.params.id,
		}
	}
	async componentDidMount() {
		// fetch one
		await this.props.fetchUser(this.state.userId)
		const joinCourse = this.props.userstatus.joinCourse
		const res = await axios({
			method: 'post',
			url: '/api/courses/ids',
			data: joinCourse,
		})
		if (res.data.code === 1) {
			this.setState({
				courses: res.data.data,
			})
		} else {
			return message.error('失败了')
		}
	}
	callback = (key) => {
		console.log(key)
	}
	render() {
		const { courses } = this.state
		return (
			<div className='person-center-class-container'>
				<Tabs defaultActiveKey='1' onChange={this.callback}>
					<TabPane tab='已加入的课程' key='1'>
						{courses.map((v) => {
							return (
								<div className='study-tl' key={v.id}>
									<div className='tl-item'>
										<div className='time'>
											<b>{v.updateAt.split(' ')[0].split('-')[0]}</b>
											<em>
												{v.updateAt.split(' ')[0].split('-')[1] + '月' + v.updateAt.split(' ')[0].split('-')[2] + '日'}
											</em>
											<em>{v.updateAt.split(' ')[1]}</em>
										</div>
										<div className='course-list'>
											<ul>
												<li className='course-one'>
													<div className='course-list-img'>
														<a href=''>
															<img src={v.coverImg ? `/cover-img/${v.coverImg}` : null} alt='' />
														</a>
													</div>
													<div className='course-list-cont'>
														<h3 className='study-hd'>
															{v.title}
															<span className='i-new'>更新完毕</span>
															{/* 收藏和删除 */}
															<div className='share-box'>
																<div className='show-btn' />
															</div>
														</h3>
														<div className='study-points'>
															<span className='i-left'>已学{parseInt(Math.random() * 99 + 1, 10)}%</span>
															<span className='i-mid'>用时{parseInt(Math.random() * 130 + 1, 10)}分</span>
														</div>
														<div className='catog-points'>
															<span className='i-left span-common'>
																<a>
																	加入课程的人数：<i>{v.joinersId.length}</i>
																</a>
															</span>
															<span className='i-right span-common'>
																{/* <a>
																	问答<i>0</i>
																</a> */}
															</span>
															<Link className='btn-red continute-btn' to={`/video/${v.id}`}>
																去学习
															</Link>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							)
						})}
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
export default PersonCenterClass
