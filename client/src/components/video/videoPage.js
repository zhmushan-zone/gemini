import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import VideoHeader from '../videoHeader/videoHeader'
import VideoContent from '../videoPageContent/videoPageContent'
import VideoChapterList from '../videoChapterList/videoChapterList'
import VideoSideBarQuestion from '../videoSideBarQuestion/videoSideBarQuestion'
import VideoSideBarNote from '../videoSideBarNote/videoSideBarNote'
import Footer from '../footer/footer'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import './videoPage.scss'
import { defaultAvatar } from '@/const'
import { sendVideoComment } from '@/redux/actions.js'
import axios from 'axios'
const { TextArea } = Input
@connect((state) => state, { sendVideoComment })
export default class VideoPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			comment: '请输入',
			visible: false,
			confirmLoading: false,
			videoChapterList: false,
			questionShow: false,
			noteShow: false,
			courseId: this.props.match.params.courseId,
			course: '',
			videoId: '',
		}
		this.openCourseSider = this.openCourseSider.bind(this)
		this.closeCourseSider = this.closeCourseSider.bind(this)
		this.chapterList = this.chapterList.bind(this)
	}
	showModal = () => {
		this.setState({
			visible: true,
		})
	}
	handleOk = async () => {
		await this.setState({
			comment: '请输入',
			confirmLoading: true,
		})
		await this.props.sendVideoComment(this.state.courseId, this.state.comment)
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			})
		}, 1000)
	}
	//
	handleChange(key, e) {
		this.setState({
			[key]: e.target.value,
		})
	}
	handleCancel = () => {
		console.log('Clicked cancel button')
		this.setState({
			visible: false,
			comment: '请输入',
		})
	}
	async componentDidMount() {
		document.querySelector('.video').parentNode.style.flex = '1'
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
	comment() {
		console.log('object')
	}
	openCourseSider(e) {
		this.setState({
			show: true,
		})
	}
	closeCourseSider(e) {
		this.setState({
			show: false,
		})
	}
	chapterList() {
		this.setState({
			videoChapterList: !this.state.videoChapterList,
		})
	}

	// 问题
	clickQuestion = () => {
		this.setState({
			questionShow: !this.state.questionShow,
			noteShow: false,
		})
	}
	closeQuestion() {
		this.setState({
			questionShow: false,
		})
	}
	// 笔记
	clickNote = () => {
		this.setState({
			noteShow: !this.state.noteShow,
			questionShow: false,
		})
	}
	// 关闭笔记
	handleCloseNoteorQues = () => {
		this.setState({
			noteShow: false,
			questionShow: false,
		})
	}

	// 点击章节看视频
	seeMovie(videoId) {
		console.log(videoId)
		this.setState({ videoId: videoId })
	}
	render() {
		const { visible, confirmLoading, course, videoId } = this.state
		return (
			<React.Fragment>
				<VideoHeader courseName={course.title} />
				{/* 评论 */}
				<Modal
					title='我要评论'
					visible={visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					okText='发表评论'
					cancelText='取消'
				>
					<TextArea rows={4} value={this.state.comment} onChange={this.handleChange.bind(this, 'comment')} />
				</Modal>
				<div className='video-page-container'>
					<div className='course-sidebar-layout'>
						{/* 章节信息 */}
						{course.sections ? (
							<VideoChapterList
								className={`video-chapter-list-container ${this.state.videoChapterList ? 'active' : ''}`}
								sections={course.sections}
								seeMovie={(videoId) => this.seeMovie(videoId)}
							/>
						) : null}

						<dl>
							<dd className='openchapter' onClick={this.chapterList}>
								<CustomIcon type='zhangjiekecheng' size={24} color='white' />
								<span>章节</span>
							</dd>
							<dd onClick={this.clickQuestion}>
								<CustomIcon type='wendaguanli' size={24} color='white' />
								<span>问答</span>
							</dd>
							{/* <dd onClick={this.clickNote}>
								<CustomIcon type='biji' size={24} color='white' />
								<span>笔记</span>
							</dd> */}
							<dd onClick={this.showModal}>
								<CustomIcon type='pinglun' size={24} color='white' />
								<span>评论</span>
							</dd>
						</dl>
					</div>
					<video
						src={`/video/${videoId}`}
						className='video'
						controls={[ 'PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen' ]}
					/>
					<div
						className={`video-panel course-sidebar-layout ${this.state.show ? 'none' : ''} ${this.state.questionShow
							? 'none'
							: ''} ${this.state.noteShow ? 'none' : ''}`}
						onClick={this.openCourseSider}
					>
						<CustomIcon type='icon-arrow-left4' size={24} color='white' />
					</div>
					<div className={`question ${this.state.questionShow ? '' : 'none'}`} style={{ width: 550 }}>
						<VideoSideBarQuestion
							closeNoteorQues={this.handleCloseNoteorQues}
							closeQuestion={this.closeQuestion.bind(this)}
						/>
					</div>

					<div className={`note ${this.state.noteShow ? '' : 'none'}`} style={{ width: 550 }}>
						<VideoSideBarNote closeNoteorQues={this.handleCloseNoteorQues} />
					</div>

					<div className={` teacher-msg ${this.state.show ? '' : 'none'}`} style={{ width: 500 }}>
						<div className='panel-container'>
							<span onClick={this.closeCourseSider}>
								<CustomIcon type='x' color='white' size={24} className='delete' />
							</span>
							<div className='v-teachers'>
								<a href='' className='v-teachers-img'>
									<img src={course.authorAvatar ? `/avatar/${course.authorAvatar}` : defaultAvatar} alt='' />
								</a>
								<dl>
									<dd className='v-t-nickname'>{course.authorUsername}</dd>
									<dd className='v-t-title'>{course.authorJob}</dd>
								</dl>
							</div>
							<p className='v-teachers-info'>{course.authorSignature}</p>
						</div>
					</div>
				</div>
				<VideoContent />
				<Footer />
			</React.Fragment>
		)
	}
}
// 5b17d27bc8eff3b610c9323c
// this.props.match.params.id
