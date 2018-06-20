import React, { Component } from 'react'
import { Input, Button } from 'antd'

import SimpleMDE from 'react-simplemde-editor'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoSideBarQuestion.scss'
import 'simplemde/dist/simplemde.min.css'
export default class VideoSideBarQuestion extends Component {
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
      <div className="side-bar-question-container">
        <div className="top">
          <h2>提问题</h2>
          <span onClick={this.props.closeNoteorQues}>
            <CustomIcon type='x' color="black" size={24} className="delete" />
          </span>
        </div>
        <Input size="large" placeholder="请输入您的问题" className="question" />
        <SimpleMDE
          onChange={this.handleChange.bind(this)}
          value={this.state.textValue}
        />
        <p className="button-p">
          <Button type="primary">提交</Button>
        </p>
      </div>
    )
  }
}
