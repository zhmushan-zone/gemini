import React, { Component } from 'react'
import { message, Modal, Radio, Row, Col } from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'
import { defaultAvatar } from '@/const'

const RadioGroup = Radio.Group

class ForumProblemPageReplyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      reportType: null,
      reportContent: ''
    }
  }
  

  handleReplyBtn() {
    const obj = document.getElementById(this.props.replyId)
    obj.setAttribute('placeholder', `回复 ${this.props.authorName}:`)
    this.props.stateChange('to', this.props.from)
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = async (e) => {
    if (this.state.reportType === null) {
      return message.warning('请选择举报类型')
    }
    this.setState({
      visible: false,
    })
    const _token = Cookies.get('_token')
    const res = await axios({
      method: 'post',
      url: '/api/reports',
      headers: {
        token: _token
      },
      data: {
        srcId: this.props.subReplyId,
        type: 2,
        msg: this.state.reportContent,
        reason: this.state.reportType
      }
    })
    if (res.data.code === 1) {
      return message.success('举报成功')
    } else {
      return message.error('举报失败')
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }
  
  onChange = (e) => {
    this.setState({
      reportType: e.target.value
    })
  }

  render() {
    const { authorName, replyAuthorId, toUserName, authorAvatar, floor, content, from, to, time } = this.props
    return (
      <div className="forum-reply-item">
        <div className="forum-reply-user-avatar">
          <a>
            <img src={authorAvatar ? `/avatar/${authorAvatar}` : defaultAvatar} alt=""/>
          </a>
        </div>
        <div className="forum-reply-user-details">
          <div className="forum-reply-user-name">
            <div className="forum-reply-user-name details">
              {
                replyAuthorId === to ?
                <a>
                  {authorName}
                  {replyAuthorId === from ?
                    <span style={{color: '#14191e'}}>(回答者)</span> : null
                  }
                </a> 
                :
                <React.Fragment>
                  <a>
                    {authorName}
                    {replyAuthorId === from ?
                      <span style={{color: '#14191e'}}>(回答者)</span> : null
                    } 
                  </a>
                  <span style={{color: '#14191e', lineHeight: '23px', padding: '0 2px'}}>回复</span>
                  <a>
                    {toUserName}
                    {replyAuthorId === to ?
                      <span style={{color: '#14191e'}}>(回答者)</span> : null
                    } 
                  </a>
                </React.Fragment>
              }
            </div>
            <div className="forum-reply-floor">
              <span>#{floor + 1}</span>
            </div>
          </div>
          <div className="forum-reply-user-content">
            {content}
          </div>
          <div className="forum-reply-operation">
            <div className="forum-reply-operation-left">
              <a className="forum-reply-btn" onClick={() => this.handleReplyBtn()}>
                回复
              </a>
              <a className="forum-reply-report" onClick={this.showModal}>
                举报
              </a>
            </div>
            <div className="forum-reply-operation-right">
              <span>
                {time}
              </span>
            </div>
          </div>
        </div>
        <Modal
          title="举报"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <button className="forum-page-report-btn" onClick={this.handleOk}>提交</button>
          ]}
        >
          <RadioGroup onChange={this.onChange} >
            <Row>
              <Col span={8}><Radio value={0}>广告或垃圾信息</Radio></Col>
              <Col span={8}><Radio value={1}>辱骂</Radio></Col>
              <Col span={8}><Radio value={2}>涉政或违法</Radio></Col>
              <Col span={8}><Radio value={3}>抄袭</Radio></Col>
              <Col span={8}><Radio value={4}>不合适内容</Radio></Col>
            </Row>
          </RadioGroup>
          <textarea className="forum-page-report-content" placeholder="写下举报理由(选填)" maxLength={150} onChange={(e) => this.setState({reportContent: e.target.value})}>
          </textarea>
          <span className="font-num-alert">{this.state.reportContent.length}/150</span>
        </Modal>
      </div>
    )
  }
}

export default ForumProblemPageReplyItem