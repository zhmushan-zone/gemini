import React, { Component } from 'react'
import ForumProblemPageInfo from '../forumProblemPageInfo/forumProblemPageInfo'
import ForumProblemPageComments from '../forumProblemPageComments/forumProblemPageComments'

class ForumProblemPageLeft extends Component {
  render() {
    return (
      <div className="forum-problem-page-left">
        <ForumProblemPageInfo />
        <ForumProblemPageComments />
      </div>
    )
  }
}


export default ForumProblemPageLeft