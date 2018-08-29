import React, { Component } from 'react'
import OpinionNav from '../opinionNav/opinionNav'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
export default class opinionFocus extends Component {
	render() {
		return (
			<div className='opinion-container'>
				<OpinionNav />
				<div className='opinionMain-container'>
					<OpinionSideBar />
					<OpinionMainCenter />
					<OpinionMainRight />
				</div>
			</div>
		)
	}
}
