import React, { Component } from 'react'
import ForumCreateProblemLeft from '../forumCreateProblemLeft/forumCreateProblemLeft'
import ForumCreateProblemRight from '../forumCreateProblemRight/forumCreateProblemRight'

import './forumCreateProblem.scss'

class ForumCreateProblem extends Component {
  render () {
    return (
      <div className="forum-create-problem">
        <ForumCreateProblemLeft />
        <ForumCreateProblemRight />
      </div>
    )
  }
}

export default ForumCreateProblem