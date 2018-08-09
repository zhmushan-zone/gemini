import React, { Component } from 'react'

import './forumProblemPreview.scss'

class ForumProblemPreview extends Component {
  render() {
    const { problemTitle, type, isFollow, replyCount, latestReply } = this.props
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
          <a className="problem-preview-title">
            {problemTitle}
          </a>
          {
            latestReply ? 
            <React.Fragment>
              <div className="latest-replyer-name">
                <a>{latestReply.replyerName}</a>
                回答:
              </div>
              <div className="latest-replyer-content">
                {latestReply.content}
              </div>
              <div className="problem-preview-operation">
                <a className="problem-preview-good-count">{latestReply.good}人赞同</a>
                <a className="problem-preview-bad-count">{latestReply.bad}人反对</a>
              </div>
            </React.Fragment>
            :
            <div className="problem-preview-operation">
              <a className="problem-preview-reply-btn">我要回答</a>
              <span>{replyCount}个回答</span>
              <a className="problem-preview-follow-btn">
                {
                  isFollow ? 
                  "取消关注" :
                  "关注"
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