import React from 'react'
import CoursePreview from '@/common/coursePreview/coursePreview'

import './lastestCourse.scss'

class LastestCourse extends React.Component {
  render () {
    const lastestCourse = lastest.map((item, index) => {
      const { name, level, viewerCount, rate, price, img } = item
      return <CoursePreview name={name}
        level={level}
        viewerCount={viewerCount}
        rate={rate}
        price={price}
        img={img}
        key={index} />
    })
    return (
      <div className="lastest-course">
        <h3>最新课程</h3>
        <div className="lastest-content">
          {lastestCourse}
        </div>
      </div>
    )
  }
}

//用于测试
const lastest = [
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 4.7, price: 100, img: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' }
]

export default LastestCourse
