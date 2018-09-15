import React, { Component } from 'react'
import VideoCommentsItem from '../VideoCommentsItem/videoCommentsItem'
import { getVideoComment, setVideoReplyComment } from '@/redux/actions.js'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { dateSortByUpdate } from '@/util/dateSort.js'
import '../articleComments/articleComments.scss'
@withRouter
@connect((state) => state, { getVideoComment, setVideoReplyComment })
class VideoComments extends Component {
	async componentDidMount() {
		const commentsId = await JSON.parse(Cookies.get('video-commentsId'))
		setTimeout(() => {
			this.props.getVideoComment(commentsId)
		}, 200)
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
