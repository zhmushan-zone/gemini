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
  Change(value) {
    this.setState({
      textValue:value
    })
  }
  handleSubmit=()=>{
    console.log(this.state)
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
          onChange={this.Change.bind(this)}
          value={this.state.textValue}
        />
        <p className="button-p">
          <Button type="primary" onClick={this.handleSubmit}>提问</Button>
        </p>
      </div>
    )
  }
}
