import React, { Component } from 'react'

import './forumProblemPageRelatedProblem.scss'

class ForumProblemPageRelatedProblem extends Component {
  render() {
    return (
      <div className="forum-problem-page-related-problem">
        <div className="forum-problem-page-title">
          同类问题
        </div>
        <ul>
          <li>
            <a>
              歌曲名字是中文怎么解决
            </a>
            <span>2回答</span>
          </li>
          <li>
            <a>
              长得帅又优秀的程序员，经常得到同事的关爱，请问怎么才能停止散发这该死的魅力？
            </a>
            <span>6回答</span>
          </li>
          <li>
            <a>
              什么程序最容易学呢
            </a>
            <span>11回答</span>
          </li>
          <li>
            <a>
              请问java在线编译网站或工具有哪些？
            </a>
            <span>3回答</span>
          </li>
          <li>
            <a>
              请问java关于开启事务？
            </a>
            <span>2回答</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default ForumProblemPageRelatedProblem