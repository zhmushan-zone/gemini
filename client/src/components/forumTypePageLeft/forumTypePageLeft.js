import React, { Component } from 'react'
import ForumProblemPreivew from '../forumProblemPreview/forumProblemPreview'
import { dateSortByUpdate } from '@/util/dateSort'

import './forumTypePageLeft.scss'

class ForumTypePageLeft extends Component {
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
    problems = this.problemFilter(showContent, problems)
    return (
      <div className="forum-type-page-left">
        <div className="forum-nav">
          <div className="forum-nav-wrapper">
            {forumNavItems}
          </div>
        </div>
        <div className="fourm-problem-wrapper">
          {
            problems.length ? 
              problems.map(item => {
                return <ForumProblemPreivew 
                  problemId={item.id}
                  problemTitle={item.title}
                  type={item.tags}
                  watchers={item.watchersId}
                  replys={item.replysId}
                  key={item.title}
                />
              }) : <p style={{color: '#999', textAlign: 'center', lineHeight: '100px', fontSize: '16px'}}>暂时没有人提问</p>
          }
        </div>
      </div>
    )
  }
}

export default ForumTypePageLeft