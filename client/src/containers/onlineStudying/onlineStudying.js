import React, { Component } from 'react'

import './onlineStudying.scss'

class OnlineStudying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部'
    }
  }
  
  tabChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const menuDirTabs = direction.map((item, index) => {
      if (item === this.state.direction) {
        return <a className="active" href="#javascript" key={index}>{item}</a>
      } else {
        return <a className="no-active" 
                href="#javascript" 
                key={index}
                onClick={() => this.tabChange('direction', item)}>
                {item}
              </a>
      }
    })
    let menuTypeTabsItems
    if (this.state.direction === '全部') {
      const menuTypeTabs = type.join().split(',')
      menuTypeTabs.unshift('全部')
      menuTypeTabsItems = menuTypeTabs.map((item, index) => {
        if (item === this.state.type) {
          return <a className="active" href="#javascript" key={index}>{item}</a>
        } else {
          return <a className="no-active" 
                  href="#javascript" 
                  key={index}
                  onClick={() => this.tabChange('type', item)}>
                  {item}
                </a>
        }
      })
    } else {
      const menuTypeTabs = type[direction.indexOf(this.state.direction) - 1]
      menuTypeTabs.unshift('全部')
      menuTypeTabsItems = menuTypeTabs.map((item, index) => {
        if (item === this.state.type) {
          return <a className="active" href="#javascript" key={index}>{item}</a>
        } else {
          return <a className="no-active" 
                  href="#javascript" 
                  key={index}
                  onClick={() => this.tabChange('type', item)}>
                  {item}
                </a>
        }
      })
    }


    return (
      <div className="online-studying">
        <div className="course-menu">
          <div className="course-menu-direction">
            <span className="course-menu-direction-title">方向:</span>
            <div className="course-menu-direction-tab">
              {menuDirTabs}
            </div>
          </div>
          <div className="course-menu-type">
            <span className="course-menu-type-title">分类:</span>
            <div className="course-menu-type-tab">
              {menuTypeTabsItems}
            </div>
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