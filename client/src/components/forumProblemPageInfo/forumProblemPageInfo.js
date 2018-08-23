import React, { Component } from 'react'
import Icon from '@/common/customIcon/customIcon'
import ForumProblemPageReply from '../forumProblemPageReply/forumProblemPageReply'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser, followProblem } from '@/redux/actions'
import Cookies from 'js-cookie'
import axios from 'axios'

import './forumProblemPageInfo.scss'

@withRouter
@connect(
  state => state,
  { fetchUser, followProblem }
)
class ForumProblemPageInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authorInfo: {
        username: '',
        avatar: ''
      },
      isFollow: false,
      followNum: 0
    }
  }

  async componentDidMount() {
    const _id = Cookies.get('_id')
    this.setState({
      followNum: this.props.currentProblem.watchersId.length
    })
    if (this.props.currentProblem.watchersId.indexOf(_id) !== -1) {
      this.setState({
        isFollow: true
      })
    }
    await this.props.fetchUser(this.props.currentProblem.authorId)
    this.setState({
      authorInfo: {
        username: this.props.User.username,
        avatar: this.props.User.avatar
      }
    })
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.paramId !== this.props.paramId) {
      const _id = Cookies.get('_id')
      this.setState({
        followNum: nextProps.currentProblem.watchersId.length
      })
      console.log(nextProps)
      if (nextProps.currentProblem.watchersId.indexOf(_id) !== -1) {
        this.setState({
          isFollow: true
        })
      } else {
        this.setState({
          isFollow: false
        })
      }
      const res = await axios({
        method: 'get',
        url: `/api/users/${nextProps.currentProblem.authorId}`
      })
      this.setState({
        authorInfo: {
          username: res.data.data.username,
          avatar: res.data.data.avatar
        }
      })
    }
  }

  follow() {
    let newFollowNum = this.state.isFollow ?
      this.state.followNum - 1 :
      this.state.followNum + 1
    this.props.followProblem(this.props.currentProblem.id)
    this.setState({
      isFollow: !this.state.isFollow,
      followNum: newFollowNum
    })
  }

  render() {
    const { currentProblem } = this.props
    const { authorInfo } = this.state
    return (
      <div className="forum-problem-page-info">
        <h1>{currentProblem.title}</h1>
        <div className="forum-problem-details">
          <a className="forum-problem-details-user">
            <img src={authorInfo.avatar ? `/avatar/${authorInfo.avatar}` : 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt=""/>
            <span>{authorInfo.username}</span>
          </a>
          <div className="forum-problem-details-data">
            <a>举报</a>
            <span>回答{currentProblem.replysId.length}</span>
            <span>浏览{currentProblem.viewnum}</span>
          </div>
        </div>
        <div className="forum-problem-page-desc" dangerouslySetInnerHTML = {{__html: currentProblem.content}}>
        </div>
        <div className="forum-problem-page-type-operation">
          <div className="forum-problem-page-type">
            {
              currentProblem.tags.map(item => {
                return <a key={item}>
                  {allTags[item]}
                </a>
              })
            }
          </div>
          <div className="forum-problem-page-operation">
            <div className="forum-problem-page-share">
              <a>
                <Icon type="weixin" color="#b6b9bc" size={26} />
              </a>
              <a>
                <Icon type="qq" color="#b6b9bc" size={24} />
              </a>
              <a>
                <Icon type="weibo" color="#b6b9bc" size={24} />
              </a>
            </div>
            <div className="forum-problem-page-follow">
              <a onClick={() => this.follow()}>
                  {
                    this.state.isFollow ?
                    <Icon type="xin1" color="#dd3929" size={24} /> :
                    <Icon type="xin" color="#b6b9bc" size={24} />
                  }
              </a>
              <span>{this.state.followNum}</span>
            </div>
          </div>
        </div>
        <ForumProblemPageReply />
      </div>
    )
  }
}

const allTags = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default ForumProblemPageInfo