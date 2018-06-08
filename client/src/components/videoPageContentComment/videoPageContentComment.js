import React, { Component } from 'react'
import VideoPageContentCommentList from '../videoPageContentCommentList/videoPageContentCommentList'
import './videoPageContentComment.scss'
export default class VideoPageContentComment extends Component {
  render() {
    return (
      <div className="video-page-content-comment-container">
        <VideoPageContentCommentList />
      </div>
    )
  }
}
