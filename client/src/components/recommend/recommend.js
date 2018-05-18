import React from 'react'
import { Divider } from 'antd';

import './recommend.scss'

class Recommend extends React.Component {
  render () {
    const recommendCourse = recmd.map((item, index) => {
      return (
        <div className="recommend-course" key={index}>
          <a href="#javascript">
            <img src={item.src} alt={item.name}/>
            <h3>{item.name}</h3>
          </a>
        </div>   
      )
    })
    return (
      <div className="recommend">
        <h3>热门课程推荐</h3>
        <div className="recommend-content">
          {recommendCourse}
        </div>
      </div>
    )
  }
}

//用于测试
const recmd = [
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 5, price: 100, src: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 5, price: 100, src: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 5, price: 100, src: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 5, price: 100, src: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 5, price: 100, src: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' }
]

export default Recommend