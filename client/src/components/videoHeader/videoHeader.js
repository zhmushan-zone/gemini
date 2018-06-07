import React, { Component } from 'react'
import UserStatus from '../nav/userStatus/userStatus'
import './videoHeader.scss'
export default class VideoHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ""
    }
  }
  render() {
    return (
      <div className="video-header-container">
        <h3>{this.props.courseName}</h3>
        <UserStatus/>
      </div>
    )
  }
}
