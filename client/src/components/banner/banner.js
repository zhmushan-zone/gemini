import React from 'react'
import CustomIcon from '@/common/customIcon/customIcon'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'

import './banner.scss'

class Banner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isTabMenuShow: false,
      menuIndex: 0
    }
  }

  menuToggleHover () {
    this.setState({
      isTabMenuShow: !this.state.isTabMenuShow
    })
  }
  // 用来修改索引来渲染标签
  menuItemHover (index) {
    this.setState({
      menuIndex: index
    })
  }

  render () {
    // 通过map menuType数组生成Menu
    const menu = menuType.map((item, index) => {
      return (
        <li key={index}>
          <a href="#javascript" 
            onMouseEnter={() => this.menuItemHover(index)}>
            <span>{item}</span>
            <CustomIcon type="previewright" className="home-menu-icon" />
          </a>
        </li>
      )
    })
    // 通过map menuIndex这个状态来决定显示的标签
    const menuTabs = tabs[this.state.menuIndex].map((item, index) => {
      return (
        <a href="/home" key={index}>
          {item}
        </a>
      )
    })
    // 通过map menuIndex来显示对应选项卡的课程
    const menuCourseItems = courses[0].map((item, index) => {
      return (
        <a href="#javascript" key={index}>
          <div className="menu-course-item">
            <img src={item.img} alt=""/>
            <div className="menu-course-item-right">
              <h3>{item.title}</h3>
              <div className="menu-course-item-data">
                <span className="menu-course-item-difficulty-data">{item.level}</span>
                <span className="menu-course-item-viewer-data">
                  <CustomIcon type="yonghu" size={12} />
                  {item.viewerCount}
                </span>
              </div>
              <div className="menu-course-item-price">
                <CustomIcon type="jifen" size={12} />
                <span style={{marginLeft: 4}}>{item.price}</span>
              </div>
            </div>
          </div>
        </a>
      )
    })
    return (
      <div className="banner">
        <div className="home-type-menu">
          <ul onMouseEnter={() => this.menuToggleHover()}
            onMouseLeave={() => this.menuToggleHover()}>
            {menu}
            {
              this.state.isTabMenuShow ? 
              <div className="home-menu-content">
                <div className="home-menu-tab-wrapper">
                  <div className="home-menu-tab-header">
                    <span>全部</span>
                    <div className="home-menu-line"></div>
                  </div>
                  <div className="home-menu-tab-content">
                    {menuTabs}
                  </div>
                </div>
                <div className="menu-type-courses">
                  {menuCourseItems}
                </div>
              </div> 
              :
              ''
            }
          </ul>
        </div>
        <div className="banner-content">
          <Carousel autoplay={true} effect="fade">
            <Link to="/home"><img src={require('@/assets/imgs/banner1.jpg')} alt="banner1"/></Link>
            <Link to="/home"><img src={require('@/assets/imgs/banner2.jpg')} alt="banner2"/></Link>
            <Link to="/home"><img src={require('@/assets/imgs/banner3.jpg')} alt="banner3"/></Link>
            <Link to="/home"><img src={require('@/assets/imgs/banner4.jpg')} alt="banner4"/></Link>
          </Carousel>
        </div>
      </div>
    )
  }
}

const menuType = ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const tabs = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

// 测试数据
const courses =  [
  [
    {
      title: '前端进阶：响应式开发与常用框架',
      level: '中级',
      viewerCount: 2200,
      price: 300,
      img: 'https://climg.mukewang.com/5915802b0001da6206000338.jpg'
    },
    {
      title: '前端面试项目冲刺，京东金融Vue组件化实战',
      level: '中级',
      viewerCount: 2200,
      price: 300,
      img: 'https://img2.mukewang.com/szimg/5a5c07bd00010ee005400300.jpg'
    },
    {
      title: 'React16+React-Router4 从零打造企业级电商后台管理系统',
      level: '中级',
      viewerCount: 2200,
      price: 300,
      img: 'https://img4.mukewang.com/szimg/5a6e7fdf0001e7bb05400300.jpg'
    },
    {
      title: '揭秘一线互联网企业 前端JavaScript高级面试',
      level: '中级',
      viewerCount: 2200,
      price: 300,
      img: 'https://img3.mukewang.com/szimg/5a9dfab40001bf1005400300.jpg'
    },
  ]
]
export default Banner
