import React, { Component } from 'react'

import './forumProblemPageReply.scss'

class ForumProblemPageReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      replyContent: ""
    }
  }
  
  contentChange (e) {
    this.setState({
      replyContent: e.target.value
    })
  }

  render() {
    return (
      <div className="forum-problem-page-reply">
        <textarea placeholder="请输入你的观点(不得少于15字)" onChange={(e) => this.contentChange(e)}></textarea>
        <div className="forum-problem-reply-btn-wrapper">
          <button>回答</button>
        </div>
      </div>
    )
  }
}

export default ForumProblemPageReply