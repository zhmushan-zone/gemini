import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
const { TextArea } = Input
export default class VideoPageContentNoteList extends Component {
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
      report: "",
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
          <div className="content">
            1.变量定义，常量不可修改
            2作用域
            3箭头函数写法简洁
            4箭头函数的this指向定义时的this
            5可扩展运算符 例如不可确定的参数个数的传递，数组连接
            6对象代理 数据保护的写法。
          </div>
          <div className="replymegfooter">
            <div className="l-box">
              <div className="thump">
                <CustomIcon type="dianzan" color="#ccc" size={14}></CustomIcon>
                1
            </div>
              <a onClick={this.showModal}>举报</a>
            </div>
            <div className="r-time"><span>13小时前</span></div>
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
