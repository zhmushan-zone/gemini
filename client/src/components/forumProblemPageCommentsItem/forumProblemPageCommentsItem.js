import React, { Component } from 'react'
import Icon from '@/common/customIcon/customIcon'

import './forumProblemPageCommentsItem.scss'

class ForumProblemPageCommentsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReplyFold: true 
    }
  }
  
  render() {
    const { userName, userAvatar, commentContent, agreeData, againstData, time } = this.props
    return (
      <div className="forum-comment-item">
        <div className="forum-comment-user-avatar">
          <a>
            <img src={require(`@/assets/superheroimgs/${userAvatar}.png`)} alt=""/>
          </a>
        </div>
        <div className="forum-comment-user-details">
          <a className="forum-comment-user-name">
          {userName}
          </a>
          <p className="forum-comment-user-content">
            {commentContent}
          </p>
          <div className="forum-comment-operation">
            <div className="forum-comment-operation-left">
              <a className="forum-comment-operation-agree">
                <Icon type="dianzan" size={14} />
                <span>{agreeData}</span>
              </a>
              <a className="forum-comment-operation-against">
                <Icon type="fandui" size={14} />
                <span>{againstData}</span>
              </a>
              <a className="forum-comment-reply">
                20个回复
              </a>
              <a className="forum-comment-report">
                举报
              </a>
            </div>
            <div className="forum-comment-operation-right">
              <span>
                {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForumProblemPageCommentsItem