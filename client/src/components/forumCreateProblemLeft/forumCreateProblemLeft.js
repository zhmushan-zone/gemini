import React, { Component } from 'react'
import ProblemEditor from '../CreateProblemItems/problemEditor/problemEditor'

import './forumCreateProblemLeft.scss'

class ForumCreateProblemLeft extends Component {
  render() {
    return (
      <div className="forum-create-problem-left">
        <h2>提问</h2>
        <input className="create-problem-title" type="text" placeholder="请用一句话简述你的问题"/>
        <ProblemEditor />
      </div>
    )
  }
}

export default ForumCreateProblemLeft