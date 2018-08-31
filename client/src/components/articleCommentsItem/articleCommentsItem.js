import React, { Component } from 'react'
import Icon from '@/common/customIcon/customIcon'
import { Input } from 'antd'

import './articleCommentsItem.scss'


const { TextArea } = Input

class ArticleCommentsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReplyFold: true,
      isShowAllReply: false
    }
  }
  
  foldReply () {
    this.setState({
      isReplyFold: !this.state.isReplyFold
    })
  }

  showMoreReply () {
    this.setState({
      isShowAllReply: true
    })
  }

  render() {
    const { userName, userAvatar, commentContent, agreeData, againstData, time } = this.props
    let replys = []
    let showMoreBtn = null
    if (this.props.replys && this.props.replys.length) {
      replys = (this.props.replys.length > 3 && !this.state.isShowAllReply) ?
        this.props.replys.slice(0, 3) :
        this.props.replys
      showMoreBtn = (this.props.replys.length > 3 && !this.state.isShowAllReply && !this.state.isReplyFold) ?
        <a className="show-more-btn" onClick={() => this.showMoreReply()}>
          点击展开后面{this.props.replys.length - 3}条评论
        </a>
        : null
    }
    return (
      <div className="forum-comment-item">
        <div className="forum-comment-user-avatar">
          <a>
            <img src={`/avatar/${userAvatar}`} alt=""/>
          </a>
        </div>
        <div className="forum-comment-user-details">
          <a className="forum-comment-user-name">
            {userName}
          </a>
          <p className="forum-comment-user-content">
            {commentContent}
          </p>
          <div className="forum-comment-operation">
            <div className="forum-comment-operation-left">
              <a className="forum-comment-operation-agree">
                <Icon type="dianzan" size={14} />
                <span>{agreeData}</span>
              </a>
              <a className="forum-comment-operation-against">
                <Icon type="fandui" size={14} />
                <span>{againstData}</span>
              </a>
              <a className="forum-comment-reply" onClick={() => this.foldReply()}>
                { 
                  this.state.isReplyFold ?
                  `${this.props.replys ? this.props.replys.length :0}个回复` :
                  '收起回复'
                }
              </a>
              <a className="forum-comment-report">
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
                  return (
                    <div className="forum-reply-item" key={index}>
                      <div className="forum-reply-user-avatar">
                        <a>
                          <img src={require(`@/assets/superheroimgs/${item.replyerAvatar}.png`)} alt=""/>
                        </a>
                      </div>
                      <div className="forum-reply-user-details">
                        <div className="forum-reply-user-name">
                          <a>{item.replyerName}</a>
                          <span>#{index + 1}</span>
                        </div>
                        <div className="forum-reply-user-content">
                          {item.replyContent}
                        </div>
                        <div className="forum-reply-operation">
                          <div className="forum-reply-operation-left">
                            <a className="forum-reply-btn">
                              回复
                            </a>
                            <a className="forum-reply-report">
                              举报
                            </a>
                          </div>
                          <div className="forum-reply-operation-right">
                            <span>
                              {item.replyTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                  })
              : null
            }
            {showMoreBtn}
            {
              !this.state.isReplyFold ?
                <div className="my-reply-container">
                  <div className="my-reply-container-left">
                    <img src={require(`@/assets/imgs/user-avator.jpg`)} alt=""/>
                  </div>
                  <div className="my-reply-container-right">
                    <TextArea placeholder="写下你的回复" autosize={{ minRows: 2, maxRows: 6 }} />
                    <div className="my-reply-container-btn-wrapper">
                      <button className="my-reply-container-btn">回复</button>
                    </div>
                  </div>
                </div>
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleCommentsItem