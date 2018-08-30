
/**
 * 文章分类的公共页面
 */
import React, { Component } from 'react'
import OpinionNav from '@/components/opinionNav/opinionNav'
import OpinionMain from '../../components/opinionMain/opinionMain'

import './opinion.scss'
class Opinion extends Component {
	componentDidMount() {
	
	}
	render() {
		return (
			<div className='opinion-container'>
				<OpinionNav />
				<OpinionMain />
			</div>
		)
	}
}

export default Opinion
