import React, { Component } from 'react'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import './opinionMain.scss'
export default class opinionMain extends Component {
	render() {
		return (
			<div className='opinionMain-container'>
				<OpinionSideBar />
				<OpinionMainCenter />
				<OpinionMainRight />
			</div>
		)
	}
}
