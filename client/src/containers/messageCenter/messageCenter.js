import React, { Component } from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'

import './messageCenter.scss'

const socket = io(`http://localhost:9999?token=${Cookies.get('_token')}`)

class MessageCenter extends Component {
  componentDidMount() {
    socket.on('notice', (data) => {
      console.log(data)
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
          {/* 模版数据 */}
          <div className="message-center-item-read">
            <div className="message-center-item-left">
              <div>
                答疑
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你的提问</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>有新的回答</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-unread">
            <div className="message-center-item-left">
              <div>
                答疑
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你的提问</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>有新的回答</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-read">
            <div className="message-center-item-left">
              <div>
                答疑
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你在</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>的回答有新回复</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-unread">
            <div className="message-center-item-left">
              <div>
                答疑
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你在</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>的回答有新的回复</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-read">
            <div className="message-center-item-left">
              <div>
                看法
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你的文章</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>有新的评论</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-unread">
            <div className="message-center-item-left">
              <div>
                看法
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你的文章</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>有新的评论</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-read">
            <div className="message-center-item-left">
              <div>
                看法
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你在</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>的评论有新回复</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-unread">
            <div className="message-center-item-left">
              <div>
                看法
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你在</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>的评论有新回复</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-read">
            <div className="message-center-item-left">
              <div>
                课程
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你在</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>的评论有新的回复</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-unread">
            <div className="message-center-item-left">
              <div>
                课程
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你在</span>
                <a>本科学前端，怎么样的学习路径才是最佳的</a>
                <span>的评论有新的回复</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
          {/* 模版数据 */}
          <div className="message-center-item-read">
            <div className="message-center-item-left">
              <div>
                积分
              </div>
            </div>
            <div className="message-center-item-right">
              <div className="message-center-item-content">
                <span>你的积分增加了5点</span>
              </div>
              <div className="message-center-item-time">
                2018-09-14 13:38:02
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageCenter