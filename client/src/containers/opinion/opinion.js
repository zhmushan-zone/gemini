
/**
 * 文章分类的公共页面
 */
import React, { Component } from 'react'
import OpinionMain from '../../components/opinionMain/opinionMain'
import './opinion.scss'
class Opinion extends Component {
	render() {
		return (
			<div className='opinion-container'>
				<OpinionMain />
			</div>
		)
	}
}

export default Opinion
