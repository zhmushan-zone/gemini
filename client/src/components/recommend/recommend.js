import React from 'react'
import CustomIcon from '@/common/customIcon/customIcon'

import './recommend.scss'

class Recommend extends React.Component {
  // 传入评价的值计算应该出现星的数量和类型
  rateJudgment (rate) {
    const star = []
    let i
    for (i = 1; i <= rate; i ++) {
      star.push('complete')
    }
    if (rate - i + 1> 0.3 && rate - i < 0.8) {
      star.push('half')
    } else if (rate - i + 1 >= 0.8) {
      star.push('complete')
    }

    return star
  }

  courseHoverIn (e) {
    const title = e.currentTarget.querySelector('.course-title')
    const cover = e.currentTarget.querySelector('.course-cover')
    title.style.color = '#F01414'
    cover.style.boxShadow = '0 10px 12px rgba(0, 0, 0, .09)'
  }

  courseHoverOut (e) {
    const title = e.currentTarget.querySelector('.course-title')
    const cover = e.currentTarget.querySelector('.course-cover')
    title.style.color = '#07111B'
    cover.style.boxShadow = 'none'
  }
  
  render () {
    const recommendCourse = recmd.map((item, index) => {
      return (
        <div className="recommend-course" key={index}>
          <a href="#javascript" onMouseEnter={(e) => this.courseHoverIn(e)} onMouseLeave={(e) => this.courseHoverOut(e)}>
            <img className="course-cover" src={item.src} alt={item.name}/>
            <h3 className="course-title">{item.name}</h3>
            <div className="recommend-course-data">
              <span className="difficulty-data">{item.level}</span>
              <span className="viewer-data">
                <CustomIcon type="yonghu" size="12" />
                {item.viewerCount}
              </span>
              <span className="rate-data">
                {
                  this.rateJudgment(item.rate).map((item, index) => {
                    if (item === 'complete') {
                      return <CustomIcon type="star1" color="#f29d39" size="14" />
                    } else {
                      return <CustomIcon type="star2" color="#f29d39" size="14" />
                    }
                  })
                }
              </span>
            </div>
            <div className="recomend-course-price">
                <CustomIcon type="jifen" color="#93999F" />
                <span>{item.price}</span>
            </div>
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
  { name: '全网最热Python3入门+进阶 更快上手实际开发', level: '中级', viewerCount: 4236, rate: 4.7, price: 100, src: 'https://img3.mukewang.com/szimg/59b8a486000107fb05400300.jpg' },
  { name: '区块链入门与去中心化应用实战', level: '中级', viewerCount: 4236, rate: 4.8, price: 100, src: 'https://img2.mukewang.com/szimg/5af2a67500016b9905400300.jpg' },
  { name: 'Vue2.5开发去哪儿网App 从零基础入门到实战项目', level: '中级', viewerCount: 4236, rate: 3.0, price: 100, src: 'https://img1.mukewang.com/szimg/5ac2dfe100014a9005400300.jpg' },
  { name: 'Java仿抖音短视频小程序开发 全栈式实战项目', level: '中级', viewerCount: 4236, rate: 3.4, price: 100, src: 'https://img1.mukewang.com/szimg/5afb8aa900014cc705400300.jpg' },
  { name: 'React Native技术精讲与高质量上线APP开发', level: '中级', viewerCount: 4236, rate: 4.1, price: 100, src: 'https://img4.mukewang.com/szimg/5adfe05e00012ecd05400300.jpg' }
]

export default Recommend