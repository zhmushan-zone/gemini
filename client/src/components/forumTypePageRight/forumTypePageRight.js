import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ForumTypePageRank from '../forumTypePageRank/forumTypePageRank'

import './forumTypePageRight.scss'

class ForumTypePageRight extends Component {
  render() {
    return (
      <div className="forum-type-page-right">
        <Link className="forum-type-page-craete-btn" to={`/forum/create`}>我要提问</Link>
        <ForumTypePageRank />
      </div>
    )
  }
}

export default ForumTypePageRight