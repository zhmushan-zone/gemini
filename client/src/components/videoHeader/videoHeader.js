import React, { Component } from 'react'
import UserStatus from '../nav/userStatus/userStatus'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import './videoHeader.scss'
export default class VideoHeader extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
		}
	}
	render() {
		let IconStyle = {
			fontSize: 24,
			cursor: 'pointer',
			color: '#777',
		}
		return (
			<div className='video-header-container'>
				<div className="left">
					<Link to={`/home`}>
						<Icon type='arrow-left' theme='outlined' style={IconStyle} />
					</Link>
					<h3>{this.props.courseName}</h3>
				</div>
				<UserStatus />
			</div>
		)
	}
}
