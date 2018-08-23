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
        <Link className="forum-problem-page-craete-btn" to={`/forum/create`}>我要提问</Link>
        <ForumProblemPageRelatedProblem />
        <ForumProblemPageRelatedType 
          type={this.props.tags}
        />
      </div>
    )
  }
}

export default ForumProblemPageRight