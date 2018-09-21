import React, { Component } from 'react'
import { Collapse, Icon, message, Modal } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { updateCourse } from '@/redux/actions'

import './backstageCourseInfoSubSection.scss'

const Panel = Collapse.Panel

@connect((state) => state.courseInfo, { updateCourse })
class BackstageCourseInfoSubSection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			visible: false,
			currentVideo: '',
			currentTitle: '',
		}
	}

	showModal = (video, title) => {
		this.setState({
			visible: true,
			currentVideo: video,
			currentTitle: title,
		})
	}

	handleOk = (e) => {
		this.setState({
			visible: false,
		})
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		})
	}

	videoUpload(e, subSectionNum) {
		const oldCourse = this.props.course
		const sectionNum = this.props.sectionNum
		this.setState({
			loading: true,
		})
		let video = e.target.files
		let bodyFormData
		bodyFormData = new FormData()
		for (let index = 0; index < video.length; index++) {
			const videoNow = video[index]
			bodyFormData.append('video', videoNow)
		}
		axios({
			method: 'post',
			url: '/api/videos',
			data: bodyFormData,
			headers: {
				token: Cookies.get('_token'),
			},
		})
			.then(async (res) => {
				this.setState({
					loading: false,
				})
				if (res.data.code === 1) {
					const newCourse = {}
					const newSections = [ ...oldCourse.sections ]
					newSections[sectionNum].nodes[subSectionNum].video = res.data.data[0]
					newCourse.id = oldCourse.id
					newCourse.title = oldCourse.title
					newCourse.coverImg = oldCourse.coverImg
					newCourse.desc = oldCourse.desc
					newCourse.direction = oldCourse.direction
					newCourse.type = oldCourse.type
					newCourse.difficulty = oldCourse.difficulty
					newCourse.price = oldCourse.price
					newCourse.sections = newSections
					this.props.updateCourse(oldCourse.id, newCourse)
					message.success('上传成功')
				}
			})
			.catch((rej) => {
				this.setState({
					loading: false,
				})
			})
	}

	render() {
		return (
			<div className='backstage-course-info-subSection'>
				<Collapse style={{ marginTop: 16 }}>
					{this.props.subSection.map((item, index) => {
						return (
							<Panel header={`第${index + 1}节:${item.title}`} key={index + 1}>
								<div className='backstage-course-current-video'>
									<span>当前视频:</span>
									{item.video === 'empty' ? (
										'无'
									) : (
										<span>
											{item.video}
											<a
												onClick={() => this.showModal(item.video, item.title)}
												style={{ fontSize: 16, lineHeight: '16px', marginLeft: 4 }}
											>
												<Icon type='play-circle' theme='outlined' />
												播放
											</a>
										</span>
									)}
								</div>
								<div
									className='backstage-course-video-upload-wrapper'
									style={{ background: this.state.loading ? '#40a9ff' : '#1890ff' }}
								>
									{this.state.loading ? (
										<React.Fragment>
											<span>
												<Icon type='loading' theme='outlined' />
												上传中
											</span>
											<input type='file' disabled />
										</React.Fragment>
									) : (
										<React.Fragment>
											<span>
												<Icon type='upload' theme='outlined' />
												上传视频
											</span>
											<input type='file' onChange={(e) => this.videoUpload(e, index)} />
										</React.Fragment>
									)}
								</div>
							</Panel>
						)
					})}
				</Collapse>
				<Modal
					title={this.state.currentTitle}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					bodyStyle={{ padding: 0 }}
					destroyOnClose={true}
				>
					<video src={this.state.currentVideo ? `/video/${this.state.currentVideo}` : null} controls='controls'>
						您的浏览器不支持 video 标签。
					</video>
				</Modal>
			</div>
		)
	}
}

export default BackstageCourseInfoSubSection
