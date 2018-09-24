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
			searchContent: '',
			shoppingCartCount: 0,
			isHaveUnRead: false
		}
		this.stateChange = this.stateChange.bind(this)
	}
	
	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
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
				<div className='nav-operation'>
					<div className='nav-search-wrapper'>
						<div className='nav-search'>
							<input type='text' onChange={(e) => this.setState({ searchContent: e.target.value })} />
							<span>
								<a onClick={() => this.search()}>
									<Icon type='search' theme='outlined' />
								</a>
							</span>
						</div>
					</div>
					<div className='nav-shopping-cart-wrapper' style={{ paddingTop: 12 }}>
						<Link to={`/shoppingCart`} className='nav-shopping-cart'>
							<Icon type='shopping-cart' theme='outlined' />
							<span style={{ marginLeft: 10 }}>购物车</span>
							{this.state.shoppingCartCount ? (
								<span className='nav-shopping-cart-count'>{this.state.shoppingCartCount}</span>
							) : null}
						</Link>
					</div>
					<div className='nav-message-center-wrapper'>
						<Link to={'/messageCenter'} className='nav-message-center'>
							<Icon type='bell' theme='filled' />
							{this.state.isHaveUnRead ? <span className='new-message-alert' /> : null}
						</Link>
					</div>
					<UserStatus stateChange={this.stateChange} />
				</div>
			</div>
		)
	}
}
