import React, { Component } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { dateSortByCreate } from '@/util/dateSort'
import { connect } from 'react-redux'
import { updateMessage } from '@/redux/actions'
import Loading from '@/common/loading/loading'

import './messageCenter.scss'

const socket = io(`http://localhost:9999?token=${Cookies.get('_token')}`)

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
    setTimeout(async () => {
      const data = [...this.props.msg]
      const templateData = []
      data.length > 1 ? dateSortByCreate(data) : null
      data.map(v => templateData.push(v.template))
      await templateData.join('a')
      this.setState({
        loading: false,
        content: templateData
      })
    }, 3000)
    socket.on('notice', (data) => {
      const newMsg = [data, ...this.props.msg]
      const oldContent = this.state.content
      const newContent = [data.template, oldContent].join('a')
      this.setState({
        content: newContent
      })
      this.props.updateMessage(newMsg)
    })
  }
  
  render() {
    return (
      <div className="message-center">
        <div className="message-center-content">
          <h3>
            消息通知(未读消息2条)
          </h3>
          <div className="message-center-content-top">
            <span className="message-clear-alert">系统自动清理三个月前的已读通知</span>
            <a>全部设为已读</a>
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