import React, { Component } from 'react'
import ForumPerson from '../forumPersonal/forumPersonal'
import ForumFollowClass from '../forumFollowClass/forumFollowClass'
import ForumAnswerList from '../forumAnswerList/forumAnswerList'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
@connect(
  state => state.userstatus,
  null
)
class ForumRight extends Component {
  render() {
    const _token = Cookies.get('_token')
    console.log(_token)
    return (
      <div className="forum-right">
        <ForumPerson username={this.props.username} integral={this.props.integral} />
        {
          _token ? 
            <ForumFollowClass follow={this.props.follow} followChange={this.props.stateChange} />
            : null
        }
        <ForumAnswerList />
      </div>
    )
  }
}

export default ForumRight