import React, { Component } from 'react'
import ForumPerson from '../forumPersonal/forumPersonal'
import ForumFollowClass from '../forumFollowClass/forumFollowClass'
import ForumAnswerList from '../forumAnswerList/forumAnswerList'

class ForumRight extends Component {
  render() {
    return (
      <div className="forum-right">
        <ForumPerson />
        <ForumFollowClass follow={this.props.follow} followChange={this.props.stateChange} />
        <ForumAnswerList />
      </div>
    )
  }
}

export default ForumRight