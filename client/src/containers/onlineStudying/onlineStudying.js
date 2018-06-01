import React, { Component } from 'react'

import './onlineStudying.scss'

class OnlineStudying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: 'all',
      type: 'all'
    }
  }
  
  render() {
    return (
      <div className="online-studying">
        <div className="course-menu">
          <div className="course-menu-direction">
            <span className="course-menu-direction-title">方向:</span>
          </div>
          <div className="course-menu-type">
            <span className="course-menu-type-title">分类:</span>
          </div>
        </div>
        <div className="online-studying-courses">
        
        </div>
      </div>
    )
  }
}

const direction = ['全部', '前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const type = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

export default OnlineStudying