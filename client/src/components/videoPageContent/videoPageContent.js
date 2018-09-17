import React, { Component } from 'react'
import CoursePreview from '@/common/coursePreview/coursePreview'
import VideoPageContentComment from '../videoPageContentComment/videoPageContentComment'
import VideoPageContentQuestion from '../videoPageContentQuestion/videoPageContentQuestion'
// import VideoPageContentNote from '../videoPageContentNote/videoPageContentNote'
import './videoPageContent.scss'



export default class VideoPageContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: [
        {
          '问答': 'true',
          component: VideoPageContentQuestion
        },
        {
          '评论': 'false',
          component: VideoPageContentComment
        },
        // {
        //   '笔记': 'false',
        //   component: VideoPageContentNote
        // }
      ],
      firstKey: '问答'
    }
  }
  render() {
    return (
      <div className="video-page-content">
        <div className="course-subnav">
          <ul>
            {this.state.show.map((v) => {
              let value = Object.values(v)[0]
              let key = Object.keys(v)[0]
              let lastkey = this.state.firstKey
              return (<li key={key} className={value === 'true' ? `current` : ''} onClick={() => {
                this.state.show.map((v) => {
                  return v[lastkey] = 'false'
                })
                v[key] = 'true'
                this.setState({
                  show: this.state.show,
                  firstKey: key
                })
              }}>{key}</li>)
            })}
          </ul>
        </div>
        <div className="course-content">
          {
            this.state.show.map((v, index) => {
              let value = Object.values(v)[0]
              return (
                <div key={index} style={value === 'true' ? { 'display': 'block' } : { 'display': 'none' }} className="course-left">
                  <div >
                    <v.component />
                  </div>
                </div>
              )
            })
          }
          <div className="course-right">
            <h4>推荐课程</h4>
            <div className="recom-course-list-box">
              {courses.map((item, index) => {
                return <CoursePreview name={item.name}
                  level={item.level}
                  viewerCount={item.viewerCount}
                  rate={item.rate}
                  price={item.price}
                  img={item.img}
                  key={index} />
              })}
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const courses = [
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, img: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, img: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, img: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, img: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' },
]
