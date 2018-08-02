import React, { Component } from 'react'
import { Switch } from 'antd'

import ForumProblemPreivew from '../forumProblemPreview/forumProblemPreview'

import './forumLeft.scss'

class ForumLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showContent: '推荐',
      isOnlyShowAttention: true
    }
  }
  
  render() {
    const { showContent } = this.state
    const forumNav = ['推荐', '最新', '等待回答', '高悬赏']
    const forumNavItems = forumNav.map((item, index) => {
      if (item === showContent) {
        return <a className="active" key={index}>{item}</a>
      }
      return <a onClick={() => this.setState({showContent: item})} key={index}>{item}</a>
    })
    return (
      <div className="forum-wrapper">
        <div className="forum-wrapper-top">
          <span>程序员自己的问答社区</span>
          <a href="">我要提问</a>
        </div>
        <div className="forum-nav">
          <div className="forum-nav-wrapper">
            {forumNavItems}
          </div>
          <div className="is-only-show-attention">
            <span>只显示关注内容</span>
            <Switch className="show-attention-switch" defaultChecked onChange={(v) => this.setState({isOnlyShowAttention: v})} />
          </div>
        </div>
      </div>
    )
  }
}

export default ForumLeft