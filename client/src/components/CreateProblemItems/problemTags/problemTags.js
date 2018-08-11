import React, { Component } from 'react'

import './problemTags.scss'

class ProblemTags extends Component {
  handleTags (index) {
    const newType = [...this.props.type]
    if (this.props.type.indexOf(index) === -1) {
      this.props.tagsChange('type', [...newType, index])
    } else {
      newType.splice(newType.indexOf(index), 1)
      this.props.tagsChange('type', newType)
    }
  }

  render() {
    const { type } = this.props
    return (
      <div className="problem-tags">
        <h3>选择问题分类，最多可选3个</h3>
        <div className="tags-wrapper">
          {
            allTags.map((item, index) => {
              return <a className={type.indexOf(index) === -1 ? null : "tag-checked"} key={item} onClick={() => this.handleTags(index)}>{item}</a>
            })
          }
        </div>
      </div>
    )
  }
}

const allTags = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default ProblemTags