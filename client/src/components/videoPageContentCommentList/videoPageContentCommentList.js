import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import VideoComment from '../videoComment/videoComment'
import './videoPageContentCommentList.scss'

import { withRouter } from 'react-router'

const { TextArea } = Input
@withRouter

export default class VideoPageContentCommentList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			report: '举报信息',
			visible: false,
			confirmLoading: false,
			courseId:this.props.match.params.courseId
		}
	}
	handleChange(e, key) {
		this.setState({
			[key]: e.target.value,
		})
	}
	showModal = () => {
		this.setState({
			visible: true,
		})
	}
	handleOk = async() => {
		this.setState({
			report: '',
			confirmLoading: true,
		})
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			})
		}, 1000)
	}
	handleCancel = () => {
		console.log('Clicked cancel button')
		this.setState({
			visible: false,
		})
	}
	render() {
		return (
			<div className='comment-list-container'>
				<VideoComment courseId={this.state.courseId}/>
				<Modal
					title='举报信息'
					visible={this.state.visible}
					onOk={this.handleOk}
					confirmLoading={this.state.confirmLoading}
					onCancel={this.handleCancel}
					okText='提交'
					cancelText='取消'
				>
					<TextArea rows={4} value={this.state.report} onChange={(e) => this.handleChange(e, 'report')} />
				</Modal>
			</div>
		)
	}
}
