import React, { Component } from 'react'

import './forumProblemPageRelatedType.scss'

class ForumProblemPageRelatedPage extends Component {
  render() {
    return (
      <div className="foru-problem-page-related-type">
        <div className="forum-problem-page-title">
          相关分类
        </div>
        {
          this.props.type.map(item => {
            return <div className="related-type-item" key={item}>
              <div className="related-type-item-left">
                <div className="related-type-item-img">
                  <img src={require(`@/assets/forumIcon/${item}.jpg`)} alt=""/>
                </div>
                <div className="related-type-item-details">
                  <div className="related-type-item-name">
                    <a>{allClass[item]}</a>
                  </div>
                  <p className="related-type-item-follow-num">
                    14827人关注
                  </p>
                </div>
              </div>
              <div className="related-type-item-right">
                <a>关注</a>
              </div>
            </div>
          })
        }
      </div>
    )
  }
}

const allClass = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default ForumProblemPageRelatedPage