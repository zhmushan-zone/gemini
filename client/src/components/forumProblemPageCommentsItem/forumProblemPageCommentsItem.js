import React, { Component } from 'react'
import Icon from '@/common/customIcon/customIcon'
import ForumProblemPageReplyItem from '../forumProblemPageReplyItem/forumProblemPageReplyItem'
import { Input, message, Modal, Radio, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

import './forumProblemPageCommentsItem.scss'

const { TextArea } = Input
const RadioGroup = Radio.Group

@withRouter
class ForumProblemPageCommentsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      isReplyFold: true,
      isShowAllReply: false,
      agreeClick: false,
      againstClick: false,
      content: '',
      replys: [],
      to: '',
      reportType: null,
      reportContent: ''
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  componentDidMount() {
    this.setState({
      to: this.props.authorId
    })
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
        srcId: this.props.replyId,
        type: 1,
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

  stateChange (key, value) {
    this.setState({
      [key]: value 
    })
  }

  foldReply () {
    if (!this.state.replys.length) {
      axios({
        method: 'post',
        url: '/api/issues/reply/subreply/ids',
        data: this.props.subReplysId
      }).then(res => {
        if(res.data.code === 1) {
          this.setState({
            replys: res.data.data,
            isReplyFold: !this.state.isReplyFold
          })
        }
      })
    } else {
      this.setState({
        isReplyFold: !this.state.isReplyFold
      })
    }
  }

  async agree () {
    const _token = Cookies.get('_token')
    await axios({
      method: 'put',
      url: `/api/issues/reply/${this.props.replyId}/up`,
      headers: {
        token: _token
      }
    })
    this.setState({
      agreeClick: true
    })
  }

  async against () {
    const _token = Cookies.get('_token')
    await axios({
      method: 'put',
      url: `/api/issues/reply/${this.props.replyId}/down`,
      headers: {
        token: _token
      }
    })
    this.setState({
      againstClick: true
    })
  }

  showMoreReply () {
    this.setState({
      isShowAllReply: true
    })
  }

  async reply() {
    if(!this.state.content.length) {
      return message.warning('输入不能为空')
    }
    const _token = Cookies.get('_token')
    const res = await axios({
      method: 'post',
      url: `/api/issues/reply/${this.props.replyId}/subreply`,
      headers: {
        token: _token
      },
      data: {
        content: this.state.content,
        to: this.state.to
      }
    })
    if (res.data.code === 1) {
      const oldReplys = [...this.state.replys]
      this.setState({
        replys: [
          ...oldReplys,
          res.data.data
        ],
        content: ''
      })
      return message.success('回复成功')
    } else {
      return message.error('回复失败')
    }
  }

  render() {
    const { myAvatar, replyId, authorId, authorName, authorAvatar, commentContent, agreeData, againstData, time, subReplysId } = this.props
    let replys = []
    let showMoreBtn = null
    if (this.state.replys && this.state.replys.length) {
      replys = (this.state.replys.length > 3 && !this.state.isShowAllReply) ?
        this.state.replys.slice(0, 3) :
        this.state.replys
      showMoreBtn = (this.state.replys.length > 3 && !this.state.isShowAllReply && !this.state.isReplyFold) ?
        <a className="show-more-btn" onClick={() => this.showMoreReply()}>
          点击展开后面{this.state.replys.length - 3}条评论
        </a>
        : null
    }
    const agreeAndAgainst = [...agreeData, ...againstData]
    const _id = Cookies.get('_id')
    return (
      <div className="forum-comment-item">
        <div className="forum-comment-user-avatar">
          <a>
            <img src={authorAvatar ? `/avatar/${authorAvatar}` : 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt=""/>
          </a>
        </div>
        <div className="forum-comment-user-details">
          <a className="forum-comment-user-name">
            {authorName}
          </a>
          <p className="forum-comment-user-content">
            {commentContent}
          </p>
          <div className="forum-comment-operation">
            <div className="forum-comment-operation-left">
              {
                agreeAndAgainst.indexOf(_id) === -1 && !this.state.againstClick ?
                  (
                    this.state.agreeClick ? 
                      <a className="forum-comment-operation-agree">
                        <Icon type="dianzan" color="#e45d54" size={14} />
                        <span style={{color: "#e45d54"}}>{agreeData.length + 1}</span>
                      </a> :
                      <a className="forum-comment-operation-agree" onClick={() => this.agree()}>
                        <Icon type="dianzan" size={14} />
                        <span>{agreeData.length}</span>
                      </a> 
                  )
                  :
                  (
                    agreeData.indexOf(_id) === -1?
                      <a className="forum-comment-operation-agree">
                        <Icon type="dianzan" size={14} />
                        <span>{agreeData.length}</span>
                      </a> :
                      <a className="forum-comment-operation-agree">
                        <Icon type="dianzan" color="#e45d54" size={14} />
                        <span style={{color: "#e45d54"}}>{agreeData.length}</span>
                      </a>
                  )
              }
              {
                agreeAndAgainst.indexOf(_id) === -1 && !this.state.agreeClick  ?
                  (
                    this.state.againstClick ? 
                      <a className="forum-comment-operation-agree">
                        <Icon type="fandui" color="#e45d54" size={14} />
                        <span style={{color: "#e45d54"}}>{againstData.length + 1}</span>
                      </a> :
                      <a className="forum-comment-operation-against" onClick={() => this.against()}>
                        <Icon type="fandui" size={14} />
                        <span>{againstData.length}</span>
                      </a>
                  )
                  :
                  (
                    againstData.indexOf(_id) === -1 ?
                      <a className="forum-comment-operation-agree">
                        <Icon type="fandui" size={14} />
                        <span>{againstData.length}</span>
                      </a> :
                      <a className="forum-comment-operation-agree">
                        <Icon type="fandui" color="#e45d54" size={14} />
                        <span style={{color: "#e45d54"}}>{againstData.length}</span>
                      </a>
                  )
              }
              <a className="forum-comment-reply" onClick={() => this.foldReply()}>
                { 
                  this.state.isReplyFold ?
                  `${subReplysId.length}个回复` :
                  '收起回复'
                }
              </a>
              <a className="forum-comment-report" onClick={this.showModal}>
                举报
              </a>
            </div>
            <div className="forum-comment-operation-right">
              <span>
                {time}
              </span>
            </div>
          </div>
          <div className="forum-reply-wrapper" style={{paddingTop: this.state.isReplyFold || !replys.length ? 0 : 20}}>
            {
              (replys.length && !this.state.isReplyFold) ? 
                replys.map((item, index) => {
                  return <ForumProblemPageReplyItem
                    replyAuthorId={authorId}
                    authorName={item.fromUsername}
                    authorAvatar={item.fromAvatar}
                    floor={index}
                    content={item.content}
                    from={item.from}
                    to={item.to}
                    toUserName={item.toUsername}
                    time={item.createAt}
                    key={index}
                    replyId={replyId}
                    subReplyId={item.id}
                    stateChange={this.stateChange}
                  />
                })
              : null
            }
            {showMoreBtn}
            {
              !this.state.isReplyFold ?
                <div className="my-reply-container">
                  <div className="my-reply-container-left">
                    <img src={myAvatar ? `/avatar/${myAvatar}` : 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt=""/>
                  </div>
                  <div className="my-reply-container-right">
                    <TextArea id={replyId} value={this.state.content} placeholder="写下你的回复" onChange={(e) => this.stateChange('content', e.target.value) } autosize={{ minRows: 2, maxRows: 6 }} />
                    <div className="my-reply-container-btn-wrapper">
                      <button className="my-reply-container-btn" onClick={() => this.reply()}>回复</button>
                    </div>
                  </div>
                </div>
                : null
            }
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

export default ForumProblemPageCommentsItem