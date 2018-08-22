import React, { Component } from 'react'
import ForumProblemPageCommentsItem from '../forumProblemPageCommentsItem/forumProblemPageCommentsItem'
import { connect } from 'react-redux'

import './forumProblemPageComments.scss'

@connect(
  state => state.userstatus,
  null
)
class ForumProblemPageComments extends Component {
  render() {
    return (
      <div className="forum-problem-page-comments">
        <div className="forum-problem-page-comments-num">
          276回答
        </div>
        {
          this.props.replys.map(item => {
            return <ForumProblemPageCommentsItem
              myAvatar={this.props.avatar}
              replyId={item.id}
              authorId={item.authorId}
              authorName={item.authorUsername}
              authorAvatar={item.authorAvatar}
              commentContent={item.content}
              agreeData={item.upersId}
              againstData={item.downersId}
              time={item.createAt}
              subReplysId={item.subReplysId}
              key={item.id}
            />
          })
        }
      </div>
    )
  }
}

export default ForumProblemPageComments