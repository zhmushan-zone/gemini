import React, { Component } from 'react'

class ForumProblemPageReplyItem extends Component {
  handleReplyBtn() {
    const obj = document.getElementById(this.props.replyId)
    obj.setAttribute('placeholder', `回复 ${this.props.authorName}:`)
    this.props.stateChange('to', this.props.from)
  }
  
  render() {
    const { authorName, replyAuthorId, toUserName, authorAvatar, floor, content, from, to, time } = this.props
    return (
      <div className="forum-reply-item">
        <div className="forum-reply-user-avatar">
          <a>
            <img src={authorAvatar ? `/avatar/${authorAvatar}` : 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt=""/>
          </a>
        </div>
        <div className="forum-reply-user-details">
          <div className="forum-reply-user-name">
            <div className="forum-reply-user-name details">
              {
                replyAuthorId === to ?
                <a>
                  {authorName}
                  {replyAuthorId === from ?
                    <span style={{color: '#14191e'}}>(回答者)</span> : null
                  }
                </a> 
                :
                <React.Fragment>
                  <a>
                    {authorName}
                    {replyAuthorId === from ?
                      <span style={{color: '#14191e'}}>(回答者)</span> : null
                    } 
                  </a>
                  <span style={{color: '#14191e', lineHeight: '23px', padding: '0 2px'}}>回复</span>
                  <a>
                    {toUserName}
                    {replyAuthorId === from ?
                      <span style={{color: '#14191e'}}>(回答者)</span> : null
                    } 
                  </a>
                </React.Fragment>
              }
            </div>
            <div className="forum-reply-floor">
              <span>#{floor + 1}</span>
            </div>
          </div>
          <div className="forum-reply-user-content">
            {content}
          </div>
          <div className="forum-reply-operation">
            <div className="forum-reply-operation-left">
              <a className="forum-reply-btn" onClick={() => this.handleReplyBtn()}>
                回复
              </a>
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

export default ForumProblemPageReplyItem