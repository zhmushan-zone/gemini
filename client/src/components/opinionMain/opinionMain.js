import React, { Component } from 'react'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import './opinionMain.scss'
export default class opinionMain extends Component {
	render() {
		return (
			<div className='opinionMain-container'>
				<div className='article'>
					<OpinionSideBar />
				</div>
			</div>
		)
	}
}
