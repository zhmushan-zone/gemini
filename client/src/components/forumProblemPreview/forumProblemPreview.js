import React, { Component } from 'react'

import './forumProblemPreview.scss'

class ForumProblemPreview extends Component {
  render() {
    return (
      <div className='forum-problem-preview'>
        <div className="problem-preview-left">
          <img src={require(`@/assets/forumIcon/0.jpg`)} alt=""/>
        </div>
        <div className="problem-preview-right">
          <div className="problem-preview-type">
            来自
            <a>JavaScript</a>
          </div>
          <a className="problem-preview-title">
            能分享一下JavaScript的学习方法吗
          </a>
          <div className="problem-preview-operation">
            <a className="problem-preview-reply-btn">我要回答</a>
            <span>1个回答</span>
            <a className="problem-preview-follow-btn">关注</a>
          </div>
        </div>
      </div>
    )
  }
}

export default ForumProblemPreview