import React, { Component } from 'react'
import ForumProblemPageLeft from '../forumProblemPageLeft/forumProblemPageLeft'
import ForumProblemPageRight from '../forumProblemPageRight/forumProblemPageRight'

import './forumProblemPage.scss'

class ForumProblemPage extends Component {
  render() {
    return (
      <div className="forum-problem-page">
        <ForumProblemPageLeft />
        <ForumProblemPageRight />
      </div>
    )
  }
}

export default ForumProblemPage