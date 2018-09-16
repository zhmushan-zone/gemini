import React, { Component } from 'react'
import { Button, Input, Icon } from 'antd'
import logo from '@/assets/imgs/article-logo.png'
import { withRouter } from 'react-router-dom'
import './opinionNav.scss'
@withRouter
export default class opinionNav extends Component {
	toEditor = () => {
		this.props.history.push('/editor')
	}
	render() {
		return (
			<div className='opinion-nav-container'>
				<nav id='sub-header'>
					<div className='sub-container' id='sub-nav'>
						<div className='article-logo'>
							<img src={logo} alt='' />
						</div>
						<div className='operate-area'>
							<Button type='danger' onClick={this.toEditor}>
								写文章
							</Button>
							{/* <Button type=''>动态圈</Button> */}
						</div>
					</div>
				</nav>
			</div>
		)
	}
}
