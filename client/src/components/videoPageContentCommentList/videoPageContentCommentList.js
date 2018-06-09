import React, { Component } from 'react'
import { Modal } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoPageContentCommentList.scss'
export default class VideoPageContentCommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalText: '举报信息',
      visible: false,
      confirmLoading: false,
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
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
            <img src="http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg" alt="" />
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
          <p>{this.state.ModalText}</p>
        </Modal>
      </div>
    )
  }
}
