import React, { Component } from 'react'

import './forumFollowClass.scss'

class forumFollowClass extends Component {
  render() {
    const tags = myFollowClass.map(item => {
      return <a index={item}>{item}</a>
    })
    return (
      <div className="forum-follow-class">
        <div className="follow-class-top">
          <h3>我关注的分类</h3>
          <span className="all-class">+</span>
        </div>
        <div className="my-follow-class-container">
          {tags}
        </div>
      </div>
    )
  }
}

const myFollowClass = ['Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default forumFollowClass