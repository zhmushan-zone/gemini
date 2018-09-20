import React, { Component } from 'react'
import VideoCommentsItem from '../VideoCommentsItem/videoCommentsItem'
import { getVideoComment, setVideoReplyComment } from '@/redux/actions.js'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router'
import { dateSortByUpdate } from '@/util/dateSort.js'
import '../articleComments/articleComments.scss'
@withRouter
@connect((state) => state, { getVideoComment, setVideoReplyComment })
class VideoComments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			course: [],
		}
	}
	async componentDidMount() {
		// 获取课程
		await axios({
			method: 'GET',
			url: `/api/courses/${this.props.courseId}`,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				course: res.data.data,
			})
		})
		this.props.getVideoComment(this.state.course.commentsId)
	}
	render() {
		const videoComment = dateSortByUpdate(this.props.video.comment)
		const { userstatus } = this.props
		return (
			<div className='article-page-comments'>
				<div className='article-page-comments-num'>{videoComment.length}回答</div>
				{videoComment ? (
					videoComment.map((item) => {
						if (item.to === '') {
							return (
								<VideoCommentsItem
									videoComment={videoComment}
									courseId={this.props.courseId}
									commentId={item.id}
									authorName={item.authorUsername}
									authorAvatar={item.authorAvatar}
									commentContent={item.content}
									agreeData={item.upersId}
									againstData={item.downersId}
									time={item.updateAt}
									replys={item.commentsId}
									key={item.id}
									to={item.to}
									// 回复的头像
									myAvatar={userstatus.avatar}
									// 子回复
									setReplyComment={(id, content, to) => this.props.setVideoReplyComment(id, content, to)}
								/>
							)
						}
					})
				) : null}
			</div>
		)
	}
}
export default VideoComments
