import React, { Component } from 'react'
import './articleRight.scss'
export default class articleLeft extends Component {
  render() {
    return (
      <div className="right-article-container">
        <div className="author_info">
          <img src="http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg" alt=""/>
          <div className="text-info">
            <div className="name">
              <span>skl</span>
              <span>关注</span>
            </div>
            <div className="job">全站工程师</div>
            <div className="contribution">
              <span>68片文章</span>
              <span>贡献55555字</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
