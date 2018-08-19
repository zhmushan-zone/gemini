import React from 'react'
import './PersonCenterDynamic.scss'
class PersonCenterDynamic extends React.Component {
	render() {
		return (
			<div className='dynamic-container'>
				{/* <p className="nodata">暂无任何动态</p> */}
				<ul>
					<li className='item'>
						<div className='activity'>
							<a  className="link">
                <div className="meta-box">
                  <div className="action">喜欢了文章</div>
                  <div className="data">2天前</div>
                </div>
                <div className="content">
                  <div className="title"> node：爬虫爬取网页图片</div>
                </div>
              </a>
						</div>
					</li>

          	<li className='item'>
						<div className='activity'>
							<a  className="link">
                <div className="meta-box">
                  <div className="action">发表了文章</div>
                  <div className="data">1天前</div>
                </div>
                <div className="content">
                  <div className="title"> node：爬虫爬取网页图片</div>
                </div>
              </a>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}
export default PersonCenterDynamic
