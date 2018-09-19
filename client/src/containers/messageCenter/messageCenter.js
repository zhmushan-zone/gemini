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
    const data = [...this.props.msg]
    const templateData = []
    data.length > 1 ? dateSortByCreate(data) : null
    data.map(v => templateData.push(v.template))
    await templateData.join()
    this.setState({
      loading: false,
      content: templateData
    })
    socket.on('notice', (data) => {
      const newMsg = [data, ...this.props.msg]
      const oldContent = this.state.content
      const newContent = [data.template, oldContent].join()
      this.setState({
        content: newContent
      })
      this.props.updateMessage(newMsg)
    })
    socket.on('connection', (data) => {
      console.log('11')
    })
    socket.on('connect', (data) => {
      console.log('1')
    })
    socket.on('disconnect', (data) => {
      console.log('0')
    })
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.msg !== nextProps.msg) {
      const data = [...nextProps.msg]
      const templateData = []
      data.length > 1 ? dateSortByCreate(data) : null
      data.map(v => templateData.push(v.template))
      templateData.join()
      this.setState({
        loading: false,
        content: templateData
      })
    }
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