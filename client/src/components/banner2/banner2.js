import React, { Component } from 'react'
import Swiper from 'swiper'

import './banner2.scss'
import { Carousel } from 'antd'

class Banner2 extends Component {
  render() {
    return (
      <div className="banner2">
        <Carousel effect="fade" autoplay>
          <div className="banner-img1 banner-img">
            <div>
              <h1>一个编程热爱者的社区</h1>
            </div>
          </div>
          <div className="banner-img2 banner-img">
            <div>
              <h1>分享你的知识</h1>
            </div>
          </div>
          <div className="banner-img3 banner-img">
            <div>
              <h1>永无止尽的学习</h1>
            </div>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default Banner2