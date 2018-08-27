import React, { Component } from 'react'
import ForumProblemPreivew from '../forumProblemPreview/forumProblemPreview'

import './forumTypePageLeft.scss'

class ForumTypePageLeft extends Component {
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
      <div className="forum-type-page-left">
        <div className="forum-nav">
          <div className="forum-nav-wrapper">
            {forumNavItems}
          </div>
        </div>
        <div className="fourm-problem-wrapper">
          {
            this.props.problems.map(item => {
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

export default ForumTypePageLeft