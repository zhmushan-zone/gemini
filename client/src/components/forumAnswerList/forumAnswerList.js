import React, { Component } from 'react'
import { Tabs } from 'antd'

import './forumAnswerList.scss'
import axios from 'axios'

const TabPane = Tabs.TabPane

class ForumAnswerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsShowAll: [false, false],
      weeklyData: [],
      totalyData: []
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/issues/reply-num-weekly'
    }).then(async res => {
      let users = []
      for (const item in res.data.data) {
        const user = [item, res.data.data[item]]
        users.push(user)
      }
      users.sort((a, b) => b[1] - a[1])
      if (users.length > 10) {
        users = users.slice(0, 10)
      }
      let weeklyData = []
      await users.forEach(async item => {
        const usersData = {}
        await axios({
          method: 'get',
          url: `/api/users/${item[0]}`
        }).then(response => {
          usersData.username = response.data.data.username
          usersData.avatar = response.data.data.avatar
          usersData.num = item[1]
          weeklyData.push(usersData)
          this.setState({
            weeklyData
          })
        })
      })
    })
    
  }

  callback = key => {
    if (key === "2" && !this.state.totalyData.length) {
      console.log(1)
      axios({
        method: 'get',
        url: '/api/issues/reply-num-totally'
      }).then(async res => {
        let users = []
        for (const item in res.data.data) {
          const user = [item, res.data.data[item]]
          users.push(user)
        }
        users.sort((a, b) => b[1] - a[1])
        if (users.length > 10) {
          users = users.slice(0, 10)
        }
        let totalyData = []
        await users.forEach(async item => {
          const usersData = {}
          await axios({
            method: 'get',
            url: `/api/users/${item[0]}`
          }).then(response => {
            usersData.username = response.data.data.username
            usersData.avatar = response.data.data.avatar
            usersData.num = item[1]
            totalyData.push(usersData)
            this.setState({
              totalyData
            })
          })
        })
      })
    }
  }

  showMore(index) {
    let newTabsShowAll = [...this.state.tabsShowAll]
    newTabsShowAll[index] = true
    this.setState({
      tabsShowAll: newTabsShowAll
    })
  }

  getList(answer) {
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
            <img src={`/avatar/${item.avatar}`} alt=""/>
          </div>
          <div className="answer-list-item-right">
            <div className="answer-name">
              <a>
                {item.username}
              </a>
            </div>
            <div className="answer-count">
              {item.num}回答
            </div>
          </div>
        </li>
      )
    })
    return answerItem
  }

  render() {
    let answerItemWeekly,
      answerItemTotaly
    this.state.weeklyData.length ? answerItemWeekly = this.getList(this.state.weeklyData) : null
    this.state.totalyData.length ? answerItemTotaly = this.getList(this.state.totalyData) : null
    return (
      <div className="forum-answer-list">
        <span className="forum-answer-list-title">回答雷锋榜</span>
        <Tabs defaultActiveKey="1" 
          onChange={this.callback}
          tabBarGutter={14}
        >
          <TabPane tab="本周" key="1">
            {
              this.state.weeklyData.length ? 
                <React.Fragment>
                  <ul>
                    {
                      this.state.tabsShowAll[0] ? 
                      answerItemWeekly :
                      answerItemWeekly.slice(0, 5)
                    }
                  </ul>
                  {
                    this.state.tabsShowAll[0] || this.state.weeklyData.length <= 5 ? 
                    null :
                    <div className="answer-show-more">
                      <button onClick={() => this.showMore(0)}>显示另外5个雷锋</button>
                    </div>
                  }
                </React.Fragment> : null
            }
          </TabPane>
          <TabPane tab="总榜" key="2">
            {
              this.state.totalyData.length ? 
                <React.Fragment>
                  <ul>
                    {
                      this.state.tabsShowAll[1] ? 
                      answerItemTotaly :
                      answerItemTotaly.slice(0, 5)
                    }
                  </ul>
                  {
                    this.state.tabsShowAll[1] || this.state.totalyData.length <= 5 ? 
                    null :
                    <div className="answer-show-more">
                      <button onClick={() => this.showMore(1)}>显示另外5个雷锋</button>
                    </div>
                  }
                </React.Fragment> : null
            }
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default ForumAnswerList