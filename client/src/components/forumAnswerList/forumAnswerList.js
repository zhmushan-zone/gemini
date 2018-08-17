import React, { Component } from 'react'
import { Tabs } from 'antd'

import './forumAnswerList.scss'

const TabPane = Tabs.TabPane

class ForumAnswerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsShowAll: [false, false]
    }
  }

  callback(key) {

  }

  showMore(index) {
    let newTabsShowAll = [...this.state.tabsShowAll]
    newTabsShowAll[index] = true
    this.setState({
      tabsShowAll: newTabsShowAll
    })
  }

  render() {
    const answerItem = answer.map((item, index) => {
      let rankingColor
      switch (index) {
        case 0:
          rankingColor = '#f8b551'
          break
        case 1:
          rankingColor = '#787d82'
          break
        case 2:
          rankingColor = '#ec6941'
          break
        default:
          rankingColor = '#b5b9bc'
          break
      }
      return (
        <li key={index}>
          <div className="answer-list-item-left">
            <span className="answer-ranking" style={{color: rankingColor}}>{index + 1}</span>
            <img src={require(`@/assets/superheroimgs/${item.avatar}.png`)} alt=""/>
          </div>
          <div className="answer-list-item-right">
            <div className="answer-name">
              <a>
                {item.username}
              </a>
            </div>
            <div className="answer-count">
              {item.answerCount}回答
            </div>
          </div>
        </li>
      )
    })
    return (
      <div className="forum-answer-list">
        <span className="forum-answer-list-title">回答雷锋榜</span>
        <Tabs defaultActiveKey="1" 
          onChange={this.callback}
          tabBarGutter={14}
        >
          <TabPane tab="本周" key="1">
            <ul>
              {
                this.state.tabsShowAll[0] ? 
                answerItem :
                answerItem.slice(0, 5)
              }
            </ul>
            {
              this.state.tabsShowAll[0] ? 
              null :
              <div className="answer-show-more">
                <button onClick={() => this.showMore(0)}>显示另外5个雷锋</button>
              </div>
            }
          </TabPane>
          <TabPane tab="总榜" key="2">
          <ul>
              {
                this.state.tabsShowAll[1] ? 
                answerItem :
                answerItem.slice(0, 5)
              }
            </ul>
            {
              this.state.tabsShowAll[1] ? 
              null :
              <div className="answer-show-more">
                <button onClick={() => this.showMore(1)}>显示另外5个雷锋</button>
              </div>
            }
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const answer = [
  { username: '美国队长', answerCount: '10', avatar: 'CaptainAmerica' },
  { username: '超人', answerCount: '10', avatar: 'SuperMan' },
  { username: '钢铁侠', answerCount: '10', avatar: 'IronMan' },
  { username: '蝙蝠侠', answerCount: '10', avatar: 'BatMan' },
  { username: '蜘蛛侠', answerCount: '10', avatar: 'SpiderMan' },
  { username: '绿箭侠', answerCount: '10', avatar: 'Arrow' },
  { username: '镭射眼', answerCount: '10', avatar: 'Cyclops' },
  { username: '死侍', answerCount: '10', avatar: 'Deadpool' },
  { username: '绿灯侠', answerCount: '10', avatar: 'GreenLantern' },
  { username: '蚁人', answerCount: '10', avatar: 'AntMan' }
]

export default ForumAnswerList