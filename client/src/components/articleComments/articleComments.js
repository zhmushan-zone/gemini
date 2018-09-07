import React, { Component } from 'react'
import ArticleCommentsItem from '../articleCommentsItem/articleCommentsItem'
import { getArticleComment, setReplyComment, commentUp } from '@/redux/actions.js'
import Cookies from 'js-cookie'
import './articleComments.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { dateSortByUpdate } from '@/util/dateSort.js'
@withRouter
@connect((state) => state, { getArticleComment, setReplyComment, commentUp })
class ArticleComments extends Component {
	async componentDidMount() {
		const _commentsId= await Cookies.get('commentsId')
		const commentsId = await JSON.parse(_commentsId)
		await this.props.getArticleComment(commentsId)
	}
	render() {
		const articleComment = dateSortByUpdate(this.props.article.comment)
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
export default ArticleComments
