import React, { Component } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { dateSortByCreate } from '@/util/dateSort'
import { connect } from 'react-redux'
import { updateMessage } from '@/redux/actions'
import { Modal, message } from 'antd'
import Loading from '@/common/loading/loading'
import axios from 'axios'

import './messageCenter.scss'

const confirm = Modal.confirm
const socket = io(`/?token=${Cookies.get('_token')}`)

@connect(
  state => state.message,
  { updateMessage }
)
class MessageCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      loading: true
    }
  }

  async componentDidMount() {
    const data = [...this.props.msg]
    const templateData = []
    data.length > 1 ? dateSortByCreate(data) : null
    data.map(v => templateData.push(v.template))
    const content = templateData.join('')
    this.setState({
      loading: false,
      content
    })
    socket.on('notice', (data) => {
      const newMsg = [data, ...this.props.msg]
      const oldContent = this.state.content
      const newContent = [data.template, oldContent].join('')
      this.setState({
        content: newContent
      })
      this.props.updateMessage(newMsg)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.msg !== nextProps.msg) {
      const data = [...nextProps.msg]
      const templateData = []
      data.length > 1 ? dateSortByCreate(data) : null
      data.map(v => templateData.push(v.template))
      const content = templateData.join('')
      this.setState({
        loading: false,
        content
      })
    }
  }

  readMsg(msgs, msgsId) {
    confirm({
      title: '设置确认',
      content: '您是否要将所有消息设置成已读？',
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          const res = await axios({
            method: 'put',
            url: '/api/notices/read',
            headers: {
              token: Cookies.get('_token')
            },
            data: msgsId
          })
          if (res.data.code === 1){
            const res2 = await axios({
              method: 'get',
              url: '/api/notices',
              headers: {
                token: Cookies.get('_token')
              }
            })
            if(res2.data.code === 1) {
              await this.props.updateMessage(res2.data.data)
              resolve('设置成功')
            }
          }
        }).then(res => {
          message.success(res)
        })
      },
      onCancel() {},
    })
  }

  render() {
    console.log(this.state.content)
    let unreadMsg = []
    let unreadMsgIds = []
    if (this.props.msg.length) {
      unreadMsg = this.props.msg.filter(item => !item.isRead)
      unreadMsgIds = [...unreadMsg].map(item => item = item.id)
    }
    return (
      <div className="message-center">
        <div className="message-center-content">
          <h3>
            消息通知(未读消息{unreadMsg.length}条)
          </h3>
          <div className="message-center-content-top">
            <span className="message-clear-alert">系统自动清理三个月前的已读通知</span>
            <a onClick={unreadMsg.length ? () => this.readMsg(this.props.msg, unreadMsgIds) : null}>全部设为已读</a>
          </div>
          {
            this.state.loading ?
            <Loading style={{marginTop: 100}} /> :
            (
              this.state.content ?
              <div  dangerouslySetInnerHTML={{__html: this.state.content}} />
              : <p style={{textAlign: 'center', color: '#999', fontSize: 16, paddingTop: 150}}>暂无消息</p>
            )
          }
        </div>
      </div>
    )
  }
}

export default MessageCenter
