import React, { Component } from 'react'
import { Input, message } from 'antd'
import { connect } from 'react-redux'
import { commentProblem } from '@/redux/actions'
import { withRouter } from 'react-router-dom'

import '../forumProblemPageReply/forumProblemPageReply.scss'

const { TextArea } = Input

@withRouter
@connect(
  state => state.problemComment,
  { commentProblem }
)
class ArticleCommentsReply extends Component {
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

  async comment () {
    const problemId = this.props.match.params.id
    if (this.state.replyContent.length < 15) {
      return message.warning('请输入不少于15字的评论哦')
    } 
    await this.props.commentProblem(problemId, this.state.replyContent)
    if (this.props.code === 1) {
      return message.success(this.props.msg)
    } else {
      return message.error(this.props.msg)
    }
  }

  render() {
    return (
      <div className="forum-problem-page-reply">
        <TextArea placeholder="请输入你的观点(不得少于15字)" onChange={(e) => this.contentChange(e)} autosize={{ minRows: 2, maxRows: 6 }} />
        <div className="forum-problem-reply-btn-wrapper">
          <button onClick={() => this.comment()}>回答</button>
        </div>
      </div>
    )
  }
}

export default ArticleCommentsReply