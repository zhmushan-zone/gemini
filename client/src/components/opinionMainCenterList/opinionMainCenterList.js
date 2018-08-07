import React, { Component } from 'react'
import { Icon } from 'antd'
import './opinionMainCenterList.scss'
export default class opinionMainCenterList extends Component {
	render() {
		return (
			<div className='opinion-main-center-list-container'>
				<div className='article-lwrap'>
					<div className='imgCon'>
						<img src='https://www.imooc.com/static/img/article/cover/pic23.jpg' alt='' />
					</div>
					<div className='list-content'>
						<p>你对JavaScript的Array对象了解有多少？</p>
						<div className='list-bottom'>
							<div className='content'>
								<div className='labels-area'>
									<a href=''>前端开发</a>
								</div>
								<div className='browseNum'>
									<Icon type='eye' />
									<span>158</span>
								</div>
								<a href='' className='nickName'>
									向建峰_Javan
								</a>
								<div className='skill'>
									<a href=''>
										<span >JavaScript</span>
									</a>
                  <a href=""> </a>
                  <a href=''>
										<span >前端工具</span>
									</a>
								</div>
							</div>
							<div className='createTime'>08.05</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
