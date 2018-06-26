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
      question:""
    }

  }
  handleChange(key,e){
    this.setState({
      [key]:e.target.value
    })
  }
  Change(value) {
    this.setState({
      textValue: value
    })
  }
  handleSubmit=()=>{
    console.log(this.state)
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
        <Input size="large" placeholder="请输入您的问题" className="question" value={this.state.question} onChange={this.handleChange.bind(this,'question')}/>
        <SimpleMDE
          onChange={this.Change.bind(this)}
          value={this.state.textValue}
        />
        <p className="button-p">
          <Button type="primary" onClick={this.handleSubmit}>提交</Button>
        </p>
      </div>
    )
  }
}
