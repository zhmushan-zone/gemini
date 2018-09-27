import React, { Component } from 'react'
import { withRouter ,Link } from 'react-router-dom'
import { Switch } from 'antd'
import { dateSortByUpdate } from '@/util/dateSort'

import ForumProblemPreivew from '../forumProblemPreview/forumProblemPreview'

import './forumLeft.scss'

@withRouter
class ForumLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showContent: 0,
      isOnlyShowAttention: true
    }
  }
  
  problemFilter(type, problems) {
    switch (type) {
      case 0:
        problems = dateSortByUpdate(problems)
        break
      case 1:
        problems = problems.sort((a, b) => b.replysId.length - a.replysId.length)
        break
      case 2:
        problems = problems.filter(item => item.replysId.length === 0)
        break
      default:
        break
    }
    return problems
  }

  render() {
    const { showContent } = this.state
    const forumNav = ['最新', '热门', '等待回答']
    const forumNavItems = forumNav.map((item, index) => {
      if (index === showContent) {
        return <a className="active" key={index}>{item}</a>
      }
      return <a onClick={() => this.setState({showContent: index})} key={index}>{item}</a>
    })
    let problems = [...this.props.problems]
    console.log(this.props.problems)
    problems = this.problemFilter(showContent, problems)
    return (
      <div className="forum-wrapper">
        <div className="forum-wrapper-top">
          <span>程序员自己的问答社区</span>
          <Link to={`${this.props.match.url}/create`}>我要提问</Link>
        </div>
        <div className="forum-nav">
          <div className="forum-nav-wrapper">
            {forumNavItems}
          </div>
          <div className="is-only-show-attention">
            <span>只显示关注内容</span>
            <Switch className="show-attention-switch" onChange={(v) => this.setState({isOnlyShowAttention: v})} />
          </div>
        </div>
        <div className="fourm-problem-wrapper">
          {
            problems.map(item => {
              return <ForumProblemPreivew 
                problemId={item.id}
                problemTitle={item.title}
                type={item.tags}
                watchers={item.watchersId}
                replys={item.replysId}
                key={item.title}
              />
            })
          }
        </div>
      </div>
    )
  }
}

export default ForumLeft