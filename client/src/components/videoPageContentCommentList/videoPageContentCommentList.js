import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoPageContentCommentList.scss'
import {defaultAvatar} from  '@/const'
const { TextArea } = Input
export default class VideoPageContentCommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      report: '举报信息',
      visible: false,
      confirmLoading: false,
    }
  }
  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      report:"",
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }
  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }
  render() {
    return (
      <div className="comment-list-container">
        <div className="headslider">
          <a href="">
            <img src={defaultAvatar} alt="" />
          </a>
        </div>
        <div className="text">
          <div className="name">精慕门6508062</div>
          <div className="content">wwwwwwwwwwwwwwwwww</div>
          <div className="replymegfooter">
            <div className="l-box">
              <div className="thump">
                <CustomIcon type="dianzan" color="#ccc" size={14}></CustomIcon>
                1
              </div>
              <a onClick={this.showModal}>举报</a>
            </div>
            <div className="r-time"><span>12小时前</span></div>
          </div>
        </div>
        <Modal title="举报信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          okText="提交"
          cancelText="取消"
        >
          <TextArea rows={4} value={this.state.report} onChange={(e) => this.handleChange(e, 'report')} />
        </Modal>
      </div>
    )
  }
}
