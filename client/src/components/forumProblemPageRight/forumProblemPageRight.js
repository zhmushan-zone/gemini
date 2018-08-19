import React, { Component } from 'react'
import { withRouter ,Link } from 'react-router-dom'
import ForumProblemPageRelatedType from '../forumProblemPageRelatedType/forumProblemPageRelatedType'
import ForumProblemPageRelatedProblem from '../forumProblemPageRelatedProblem/forumProblemPageRelatedProblem'

import './forumProblemPageRight.scss'

@withRouter
class ForumProblemPageRight extends Component {
  render() {
    return (
      <div className="forum-problem-page-right">
        <Link className="forum-problem-page-craete-btn" to={`${this.props.match.url}/create`}>我要提问</Link>
        <ForumProblemPageRelatedProblem />
        <ForumProblemPageRelatedType 
          type={[0, 1, 2]}
        />
      </div>
    )
  }
}

export default ForumProblemPageRight