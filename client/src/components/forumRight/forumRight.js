import React, { Component } from 'react'
import ForumPerson from '../forumPersonal/forumPersonal'
import ForumFollowClass from '../forumFollowClass/forumFollowClass'

class ForumRight extends Component {
  render() {
    return (
      <div className="forum-right">
        <ForumPerson />
        <ForumFollowClass follow={this.props.follow} followChange={this.props.stateChange} />
      </div>
    )
  }
}

export default ForumRight