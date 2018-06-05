import React, { Component } from 'react'
import ForumLeft from '@/components/forumLeft/forumLeft'

import './forum.scss'

class Forum extends Component {
  render() {
    return (
      <div className="forum">
        <ForumLeft />
        <div className="forum-personal">
        
        </div>
      </div>
    )
  }
}

export default Forum