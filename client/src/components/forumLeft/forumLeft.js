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
          <a href="/problemCreate">我要提问</a>
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
        <div className="fourm-problem-wrapper">
          {
            testData.map(item => {
              return <ForumProblemPreivew 
                problemTitle={item.problemTitle}
                type={item.type}
                isFollow={item.isFollow}
                replyCount={item.replyCount}
                latestReply={item.latestReply}
                key={item.problemTitle}
              />
            })
          }
        </div>
      </div>
    )
  }
}

const testData = [
  {
    problemTitle: '能分享一下JavaScript的学习方法吗?',
    type: [0, 8],
    isFollow: false,
    replyCount: 10,
    latestReply: {
      replyerName: '该用户已成仙',
      content: '你好,我认为JavaScript最好的学习方法是多做一些小玩意儿,来增加自己对这门语言的兴趣,当你每完成一个作品,就会增加一分成就感,慢慢的,你对JavaScript的掌握也会越来越熟练了',
      good: 10,
      bad: 0
    }
  },
  {
    problemTitle: 'css水平垂直居中的所有方法',
    type: [5],
    isFollow: true,
    replyCount: 10,
    latestReply: null
  }
]

export default ForumLeft