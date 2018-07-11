import React, { Component } from 'react'
import ForumLeft from '@/components/forumLeft/forumLeft'
import ForumRight from '@/components/forumRight/forumRight'

import './forum.scss'

class Forum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      follow: []
    }
    this.stateChange = this.stateChange.bind(this);
  }
  
  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div className="forum">
        <ForumLeft />
        <ForumRight follow={this.state.follow} stateChange={this.stateChange}/>
      </div>
    )
  }
}

export default Forum