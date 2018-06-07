import React, { Component } from 'react'
import ForumLeft from '@/components/forumLeft/forumLeft'
import ForumPersonal from '@/components/forumPersonal/forumPersonal'

import './forum.scss'

class Forum extends Component {
  render() {
    return (
      <div className="forum">
        <ForumLeft />
        <ForumPersonal />
      </div>
    )
  }
}

export default Forum