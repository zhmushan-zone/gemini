import React, { Component } from 'react'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoSideBarNote.scss'
export default class VideoSideBarNote extends Component {
  render() {
    return (
      <div className="video-side-bar-note-container">
        <h2>note</h2>
        <span onClick={this.props.closeNoteorQues}>
          <CustomIcon type='x' color="black" size={24} className="delete" />
        </span>
      </div>
    )
  }
}
