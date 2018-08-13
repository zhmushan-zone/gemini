import React, { Component } from 'react'
import './forumProblemPageInfo.scss'

class ForumProblemPageInfo extends Component {
  render() {
    return (
      <div className="forum-problem-page-info">
        <h1>能分享一下JavaScript的学习方法吗?</h1>
        <div className="forum-problem-details">
          <a className="forum-problem-details-user">
            <img src={require(`@/assets/imgs/user-avator.jpg`)} alt=""/>
            <span>该用户已成仙</span>
          </a>
          <div className="forum-problem-details-data">
            <a>举报</a>
            <span>回答274</span>
            <span>浏览52745</span>
          </div>
        </div>
        <p className="forum-problem-page-desc">
          最近刚入坑JavaScript，感觉学起来十分吃力，求大佬们推荐一下如何有效的学习JavaScript，以及学习的方向，感谢感谢！！！
        </p>
        <div className="forum-problem-page-type-operation">
          <div className="forum-problem-page-type">
            <a>JavaScript</a>
            <a>HTML5</a>
            <a>CSS3</a>
          </div>
        </div>
      </div>
    )
  }
}

export default ForumProblemPageInfo