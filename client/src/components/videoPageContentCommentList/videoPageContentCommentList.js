import React, { Component } from 'react'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoPageContentCommentList.scss'
export default class VideoPageContentCommentList extends Component {
  render() {
    return (
      <div className="comment-list-container">
        <div className="headslider">
          <a href="">
            <img src="http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg" alt="" />
          </a>
        </div>
        <div className="text">
          <div className="name">精慕门6508062</div>
          <div className="content">wwwwwwwwwwwwwwwwww</div>
          <div className="replymegfooter">
            <div className="l-box">
              <div className="thump">
                <CustomIcon type="dianzan" color="#ccc" size={14}></CustomIcon>
                1
              </div>
              <a href="">举报</a>
            </div>
            <div className="r-time"><span>12小时前</span></div>
          </div>
        </div>
      </div>
    )
  }
}
