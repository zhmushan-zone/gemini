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
        {
          this.props.replys.length ? 
          <React.Fragment>
            <div className="forum-problem-page-comments-num">
              {this.props.replys.length}回答
            </div>
            {
              this.props.replys.map(item => {
                console.log(item)
                return <ForumProblemPageCommentsItem
                  issueId={this.props.problemId}
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
          </React.Fragment> :
          <p className="no-reply-alert">暂无任何回答</p>
        }
      </div>
    )
  }
}

export default ForumProblemPageComments