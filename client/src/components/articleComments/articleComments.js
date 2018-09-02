import React, { Component } from 'react'
import ArticleCommentsItem from '../articleCommentsItem/articleCommentsItem'
import { getArticleComment, setReplyComment, commentUp } from '@/redux/actions.js'
import Cookies from 'js-cookie'
import './articleComments.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import dateSort from '@/util/dateSort.js'
@withRouter
@connect((state) => state, { getArticleComment, setReplyComment, commentUp })
class ArticleComments extends Component {
	async componentDidMount() {
		const commentsId = await JSON.parse(Cookies.get('commentsId'))
		await this.props.getArticleComment(commentsId)
	}
	render() {
		const articleComment = dateSort(this.props.article.comment)
		const { userstatus } = this.props
		return (
			<div className='article-page-comments'>
				<div className='article-page-comments-num'>{articleComment.length}回答</div>
				{articleComment ? (
					articleComment.map((item) => {
						if (item.to === '') {
							return (
								<ArticleCommentsItem
									articleComment={articleComment}
									articleId={this.props.articleId}
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
									setReplyComment={(id, content, to) => this.props.setReplyComment(id, content, to)}
								/>
							)
						}
					})
				) : null}
			</div>
		)
	}
}

// const testData = [
//   {
//     userName: '钢铁侠',
//     userAvatar: 'IronMan',
//     commentContent: '加油孩子，学好了来斯塔克工业，我罩着你',
//     agreeData: '500',
//     againstData: '110',
//     time: '2018-08-15',
//     replys: [
//       {
//         replyerName: '绿箭侠',
//         replyerAvatar: 'Arrow',
//         replyContent: '超人，偶像啊！！！你说的好有道理，我就按你说的做，一定能取得很大的进步的！！！',
//         replyTime: '2018-08-15'
//       }
//     ]
//   }
// ]

export default ArticleComments
