import React, { Component } from 'react'
import './opinionMainCenter.scss'
import opBanner1 from '@/assets/imgs/opinionBanner.jpg'
import opBanner2 from '@/assets/imgs/opinionBanner2.jpg'
import opBanner3 from '@/assets/imgs/opinionBanner3.jpg'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
export default class opinionMainCenter extends Component {
	render() {
		const virtual = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
		return (
			<div className='opinion-main-center-container'>
				<div className='centerlist'>
					<div className='bannerBox'>
						<div className='leftImg'>
							<img src={opBanner1} alt='' />
							<div className='bannerDescription'>RabbitMQ消息可靠性投递解决方案</div>
						</div>
						<div className='rightImg'>
							<div className='topImg'>
								<img src={opBanner2} alt='' />
								<div className='bannerDescription2'>Android 刘海屏适配总结</div>
							</div>
							<div className='bottomImg'>
								<img src={opBanner3} alt='' />
								<div className='bannerDescription2'>Java面试框架知识点总结</div>
							</div>
						</div>
					</div>
				</div>
				{virtual.map((v) => {
					return <OpinionMainCenterList key={v}/>
				})}
			</div>
		)
	}
}
