import React, { Component } from 'react'
import ForumProblemPageInfo from '../forumProblemPageInfo/forumProblemPageInfo'
import ForumProblemPageComments from '../forumProblemPageComments/forumProblemPageComments'

class ForumProblemPageLeft extends Component {
  render() {
    return (
      <div className="forum-problem-page-left">
        <ForumProblemPageInfo currentProblem={this.props.problem}/>
        <ForumProblemPageComments problem={this.props.problem} />
      </div>
    )
  }
}


export default ForumProblemPageLeft