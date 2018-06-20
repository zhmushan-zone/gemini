import React, { Component } from 'react'
import { Button } from 'antd'
import SimpleMDE from 'react-simplemde-editor'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoSideBarNote.scss'
import 'simplemde/dist/simplemde.min.css'
export default class VideoSideBarNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: "",
    }
  }
  handleChange() {

  }
  render() {
    return (
      <div className="video-side-bar-note-container">
        <div className="top">
          <h2>写笔记</h2>
          <span onClick={this.props.closeNoteorQues}>
            <CustomIcon type='x' color="black" size={24} className="delete" />
          </span>
        </div>
        <SimpleMDE
          onChange={this.handleChange.bind(this)}
          value={this.state.textValue}
        />
        <p className="button-p">
          <Button type="primary">提问</Button>
        </p>
      </div>
    )
  }
}
