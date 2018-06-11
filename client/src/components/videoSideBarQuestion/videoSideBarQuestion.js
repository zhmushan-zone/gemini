import React, { Component } from 'react'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoSideBarQuestion.scss'
export default class VideoSideBarQuestion extends Component {
  render() {
    
    return (
      <div className="side-bar-question-container">
        <h2>question</h2>
        <span onClick={this.props.closeNoteorQues}>
          <CustomIcon type='x' color="black" size={24} className="delete" />
        </span>
      </div>
    )
  }
}
