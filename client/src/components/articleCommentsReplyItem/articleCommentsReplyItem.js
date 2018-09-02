import React, { Component } from 'react'
import { defaultAvatar } from '@/const.js'
class ArticleCommentsReplyItem extends Component {
  render() {
    const {  content, from, to, time ,authorAvatar} = this.props
    return (
      <div className="forum-reply-item">
        <div className="forum-reply-user-avatar">
          <a>
            <img src={authorAvatar?`/avatar/${authorAvatar}`:defaultAvatar} alt=""/>
          </a>
        </div>
        <div className="forum-reply-user-details">
          <div className="forum-reply-user-name">
          </div>
          <div className="forum-reply-user-content">
            {content}
          </div>
          <div className="forum-reply-operation">
            <div className="forum-reply-operation-left">
              {/* <a className="forum-reply-btn">
                回复
              </a> */}
              <a className="forum-reply-report">
                举报
              </a>
            </div>
            <div className="forum-reply-operation-right">
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

export default ArticleCommentsReplyItem