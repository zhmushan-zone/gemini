import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { defaultAvatar } from '@/const'

import './forumTypePageRank.scss'

@withRouter
class ForumTypePageRank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsShowAll: false,
      rankData: []
    }
  }
  
  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/issues/tags/${this.props.match.params.type}/user-approved-num`
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
      let rankData = []
      await users.forEach(async item => {
        const usersData = {}
        await axios({
          method: 'get',
          url: `/api/users/${item[0]}`
        }).then(response => {
          usersData.username = response.data.data.username
          usersData.avatar = response.data.data.avatar
          usersData.signature = response.data.data.signature
          usersData.num = item[1]
          rankData.push(usersData)
          this.setState({
            rankData
          })
        })
      })
    })
  }

  getList(data) {
    const list = data.map((item, index) => {
      return (
        <li key={index}>
          <div className="type-rank-user-left">
            <img src={item.avatar ? `/avatar/${item.avatar}` : defaultAvatar} alt=""/>
          </div>
          <div className="type-rank-user-right">
            <div className="type-rank-user-name">
              <a>{item.username}</a>
            </div>
            <div className="rank-desc-and-count">
              <span className="rank-desc">{item.signature}</span>
              <span>收获{item.num}赞同</span>
            </div>
          </div>
        </li>
      )
    })
    return list
  }

  showMore() {
    this.setState({
      tabsShowAll: true
    })
  }

  render() {
    let userList
    const rankData = [...this.state.rankData]
    rankData.length > 1 ? rankData.sort((a, b) => b.num - a.num) : null
    rankData.length ? userList = this.getList(rankData) : null
    return (
      <div className="forum-type-page-rank">
        <div className="forum-type-page-rank-title">最佳回答用户</div>
        <div className="forum-type-page-rank-user-wrapper">
          <ul>
            {
              rankData.length ? 
              (
                this.state.tabsShowAll ?
                userList : userList.slice(0,5)
              ) 
              : <p style={{textAlign: 'center', color: '#999'}}>暂无用户</p>
            }
          </ul>
          {
            this.state.tabsShowAll || this.state.rankData.length <= 5 ? 
            null :
            <div className="answer-show-more">
              <button onClick={() => this.showMore()}>显示另外5个用户</button>
            </div>
          }
        </div>
      </div>
    )
  }
}
export default ForumTypePageRank