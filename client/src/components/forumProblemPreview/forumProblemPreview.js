import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './forumProblemPreview.scss'

class ForumProblemPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestReply: null,
      latestReplyAuthor: null
    }
  }

  componentDidMount() {
    if (this.props.replys.length > 0) {
      axios.post('/api/issues/reply/ids', [this.props.replys[this.props.replys.length - 1]]).then((res) => {
        console.log(res.data.data[0])
        this.setState({
          latestReply: res.data.data[0]
        })


        axios.get(`/api/users/${res.data.data[0].authorId}`).then(response => {
          this.setState({
            latestReplyAuthor: response.data.data
          })
        })
      })
      
    }
  }
  
  render() {
    const { problemTitle, type, watchers, replys, problemId } = this.props
    

    return (
      <div className='forum-problem-preview'>
        <div className="problem-preview-left">
          <img src={require(`@/assets/forumIcon/${type[0]}.jpg`)} alt=""/>
        </div>
        <div className="problem-preview-right">
          <div className="problem-preview-type">
            来自
            {
              type.map(item => {
                return <a key={item}>{allType[item]}</a>
              })
            }
          </div>
          <Link className="problem-preview-title" to={`/forum/details/${problemId}`}>
            {problemTitle}
          </Link>
          {
            this.state.latestReply && this.state.latestReplyAuthor ? 
            <React.Fragment>
              <div className="latest-replyer-name">
                <a>{this.state.latestReplyAuthor.username}</a>
                回答:
              </div>
              <div className="latest-replyer-content">
                {this.state.latestReply.content}
              </div>
              <div className="problem-preview-operation">
                <a className="problem-preview-good-count">{this.state.latestReply.upersId.length}人赞同</a>
                <a className="problem-preview-bad-count">{this.state.latestReply.downersId.length}人反对</a>
              </div>
            </React.Fragment>
            :
            <div className="problem-preview-reply-btn">
              <Link className="problem-preview-title" to={`/forum/details/${problemId}`}>
                我要回答
              </Link>
              <span>{replys.length}个回答</span>
              <a className="problem-preview-follow-btn">
                {
                  
                }
              </a>
          </div>
          }
        </div>
      </div>
    )
  }
}

const allType = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']


export default ForumProblemPreview