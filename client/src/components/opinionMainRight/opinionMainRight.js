import React, { Component } from 'react'
import OpinionMainRightHot from '../opinionMainRightHot/opinionMainRightHot'
import './opinionMainRight.scss'
import seven from '@/assets/imgs/seven.png'
import thirty from '@/assets/imgs/thirty.png'
import { connect } from 'react-redux'
@connect((state) => state, {})
export default class opinionMainRight extends Component {
	render() {
		const { articleArray } = this.props.article
		return (
			<div className='opinion-main-right'>
				<div className='carefully_selected'>
					<div className='sevenImg'>
						<img src={seven} alt='' />
					</div>
					<div className='thirtyImg'>
						<img src={thirty} alt='' />
					</div>
				</div>
				{articleArray ? <OpinionMainRightHot artcileArray={articleArray} /> : "暂无数据"}
			</div>
		)
	}
}
