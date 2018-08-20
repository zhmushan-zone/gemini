import React, { Component } from 'react'
import { type as Type } from './type'

import './forumProblemTypePage.scss'

class ForumProblemTypePage extends Component {
  render() {
    const typeIndex = this.props.match.params.type

    return (
      <div className="forum-problem-type-page">
        <div className="forum-problem-type-page-top">
          <div className="forum-problem-type-page-logo">
            <img src={require(`@/assets/forumIcon/${typeIndex}.jpg`)} alt=""/>
          </div>
          <h3>
            {Type[typeIndex].name}
          </h3>
          <div className="forum-problem-type-page-desc">
            <p>
            {Type[typeIndex].desc}
            </p>
          </div>
          <div className="type-page-follow-wrapper">
            <a className="follow">
              关注
            </a>
            {/* <a className="no-follow">
              取消关注
            </a> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ForumProblemTypePage