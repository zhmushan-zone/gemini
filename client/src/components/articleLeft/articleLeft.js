import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'antd'
import TagSample from '../tagSample/tagSample'
import './articleLeft.scss'
export default class articleLeft extends Component {
  constructor(props){
    super(props)
    this.state={
      like:false
    }
  }
  handleLike=()=>{
    this.setState({
      like:!this.state.like
    })
  }
	render() {
		return (
			<div className='left-article-container'>
				<Breadcrumb>
					<Breadcrumb.Item href=''>
						<span>手记</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<span>前端开发</span>
					</Breadcrumb.Item>
				</Breadcrumb>
				<div className='title'>
					<h2 className='detail-title'>IE，你滚！用LESS与Module来提升你的效率</h2>
					<div className='dc-profile'>
						<div class='l'>
							<span style={{ marginRight: 10 }}>2018.08.16 17:38</span>
							<span class=''>126浏览</span>
						</div>
					</div>
					<div className='content'>内容</div>
					<hr />
					{/* 标签 */}
					<div className='cat-box'>
						<TagSample name={0} />
						<TagSample name={1} />
					</div>
					{/* 推荐 */}
					<div className='praise-box'>
						<button className={`js-praise ${this.state.like?'like':''}`} onClick={this.handleLike}>
							<Icon type="star" className={`${this.state.like?'like':''}`} />
						</button>
            <div class="num-person"><em class="num">4</em>人推荐</div>
					</div>
          {/* 评论 */}
          <div id="comment">
            <div className="author">
              <img src="http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg" alt=""/>
            </div>
            <p className="fadeInput ">共同学习，写下你的评论</p>
          </div>
				</div>
			</div>
		)
	}
}
