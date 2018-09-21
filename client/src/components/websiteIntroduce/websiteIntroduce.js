import React, { Component } from 'react'

import './websiteIntroduce.scss'

class WebsiteIntroduce extends Component {
  render() {
    return (
      <div className="website-introduce">
        <div className="website-introduce-item">
          <div className="website-introduce-item-img">
            <img src={require('@/assets/imgs/home-img1.png')} alt=""/>
          </div>
          <h4>社交分享</h4>
          <h5>互相分享，互相学习</h5>
        </div>
        <div className="website-introduce-item">
          <div className="website-introduce-item-img">
            <img src={require('@/assets/imgs/home-img2.png')} alt=""/>
          </div>
          <h4>在线学习</h4>
          <h5>学习前沿的IT知识</h5>
        </div>
        <div className="website-introduce-item">
          <div className="website-introduce-item-img">
            <img src={require('@/assets/imgs/home-img3.png')} alt=""/>
          </div>
          <h4>答疑解惑</h4>
          <h5>一起来讨论困惑吧</h5>
        </div>
        <div className="website-introduce-item">
          <div className="website-introduce-item-img">
            <img src={require('@/assets/imgs/home-img4.png')} alt=""/>
          </div>
          <h4>撰写看法</h4>
          <h5>发表属于你的见解</h5>
        </div>
      </div>
    )
  }
}

export default WebsiteIntroduce