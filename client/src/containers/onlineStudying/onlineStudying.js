import React, { Component } from 'react'
import OnlineStudyingMenu from '@/components/onlineStudyingMenu/onlineStudyingMenu'
import OnlineStudyingOperation from '@/components/onlineStudyingOperation/onlineStudyingOperation'
import CoursePreview from '@/common/coursePreview/coursePreview'
import { Pagination } from 'antd'

import './onlineStudying.scss'

class OnlineStudying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部',
      newOrHot: '最新',
      difficulty: '全部',
      isHideAttenedCourse: false
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const { direction, type, newOrHot, difficulty } = this.state 
    const coursesItem = courses.map((item, index) => {
      return <CoursePreview 
              name={item.name}
              level={item.level}
              viewerCount={item.viewerCount}
              rate={item.rate}
              price={item.price}
              img={item.img}
              />
    })
    return (
      <div className="online-studying">
        <OnlineStudyingMenu 
          direction={direction}
          type={type}
          tabChange={this.stateChange}
        />
        <div className="online-studying-courses">
          <OnlineStudyingOperation 
            newOrHot={newOrHot}
            difficulty={difficulty}
            operationChange={this.stateChange}
          />
          <div className="online-studying-courses-wrapper">
            {coursesItem}
            <Pagination className="online-studying-courses-pagination" defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    )
  }
}

const courses = [
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 4.7, price: 100, img: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' },
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 4.7, price: 100, img: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' },
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 4.7, price: 100, img: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' },
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 4.7, price: 100, img: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' }
]

export default OnlineStudying