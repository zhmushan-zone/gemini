import React, { Component } from 'react'
import { Input } from 'antd'

import './forumProblemPageReply.scss'

const { TextArea } = Input

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
        <TextArea placeholder="请输入你的观点(不得少于15字)" onChange={(e) => this.contentChange(e)} autosize={{ minRows: 2, maxRows: 6 }} />
        <div className="forum-problem-reply-btn-wrapper">
          <button>回答</button>
        </div>
      </div>
    )
  }
}

export default ForumProblemPageReply