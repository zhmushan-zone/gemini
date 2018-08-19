import React, { Component } from 'react'
import Icon from '@/common/customIcon/customIcon'
import ForumProblemPageReply from '../forumProblemPageReply/forumProblemPageReply'

import './forumProblemPageInfo.scss'
import axios from 'axios'

class ForumProblemPageInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authorInfo: {
        username: '',
        avatar: ''
      }
    }
  }

  async componentDidMount() {
    if (this.props.problem) {
      const res = await axios.get(`/api/users/${this.props.problem.authorId}`)
      if (res.data.code === 1) {
        console.log(res)
        this.setState({
          authorInfo: {
            username: res.data.data.username,
            avatar: res.data.data.avatar
          }
        })
      }
    }
  }
  render() {
    const { problem } = this.props
    const { authorInfo } = this.state
    return (
      <div className="forum-problem-page-info">
        <h1>{problem.title}</h1>
        <div className="forum-problem-details">
          <a className="forum-problem-details-user">
            <img src={require(`@/assets/imgs/user-avator.jpg`)} alt=""/>
            <span>{authorInfo.username}</span>
          </a>
          <div className="forum-problem-details-data">
            <a>举报</a>
            <span>回答{problem.replysId.length}</span>
            <span>浏览{problem.viewnum}</span>
          </div>
        </div>
        <div className="forum-problem-page-desc" dangerouslySetInnerHTML = {{__html: problem.content}}>
        </div>
        <div className="forum-problem-page-type-operation">
          <div className="forum-problem-page-type">
            {
              problem.tags.map(item => {
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
              <a>
                  {/* <Icon type="xin1" color="#dd3929" size={24} /> */}
                  <Icon type="xin" color="#b6b9bc" size={24} />
              </a>
              <span>{problem.watchersId.length}</span>
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