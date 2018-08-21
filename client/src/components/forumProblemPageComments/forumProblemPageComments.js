import React, { Component } from 'react'
import ForumProblemPageCommentsItem from '../forumProblemPageCommentsItem/forumProblemPageCommentsItem'
import './forumProblemPageComments.scss'

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
              replyId={item.id}
              authorId={item.authorId}
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