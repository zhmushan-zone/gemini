import React, { Component } from 'react'
import ForumLeft from '@/components/forumLeft/forumLeft'
import ForumRight from '@/components/forumRight/forumRight'

import './forum.scss'

class Forum extends Component {
  render() {
    return (
      <div className="forum">
        <ForumLeft />
        <ForumRight />
      </div>
    )
  }
}

export default Forum