import React, { Component } from 'react'
import { Tag } from 'antd'

import './backstagePronblemItem.scss'

class BackstageProblemItem extends Component {
  render() {
    const { authorId, title, tags, content, createTime, viewNum, followNum, replyNum } = this.props
    return (
      <div className="backstage-problem-item">
        <h4>
          <a>
            {title}
          </a>
        </h4>
        <div className="backstage-problem-item-tags">
          {
            tags.map((item, index) => {
              return <Tag key={index}>{allTags[item]}</Tag>
            })
          }
        </div>
        <div className="backstage-problem-item-content" dangerouslySetInnerHTML = {{__html: content}}></div>
      </div>
    )
  }
}

const allTags = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default BackstageProblemItem