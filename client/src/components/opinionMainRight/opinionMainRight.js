import React, { Component } from 'react'
import OpinionMainRightHot from '../opinionMainRightHot/opinionMainRightHot'
import './opinionMainRight.scss'
import seven from '@/assets/imgs/seven.png'
import thirty from '@/assets/imgs/thirty.png'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
@withRouter
@connect((state) => state, {})
export default class opinionMainRight extends Component {
	render() {
		const { articleArray } = this.props.article
		return (
			<div className='opinion-main-right'>
				<div className='carefully_selected'>
					<div className='sevenImg' onClick={()=>this.props.history.push('/excellentSeven')}>
						<img src={seven} alt='' />
					</div>
					<div className='thirtyImg' onClick={()=>this.props.history.push('/excellentThirty')}>
						<img src={thirty} alt='' />
					</div>
				</div>
				{articleArray ? <OpinionMainRightHot artcileArray={articleArray} /> : "暂无数据"}
			</div>
		)
	}
}
