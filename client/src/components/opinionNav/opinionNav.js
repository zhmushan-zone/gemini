import React, { Component } from 'react'
import { Button, Input, Icon } from 'antd'
import logo from '@/assets/imgs/article-logo.png'
import './opinionNav.scss'
export default class opinionNav extends Component {
	render() {
		return (
			<div className='opinion-nav-container'>
				<nav id='sub-header'>
					<div className='sub-container' id='sub-nav'>
						<div className='article-logo'>
							<img src={logo} alt='' />
						</div>
						<div className='search-warp'>
							<Input placeholder='搜索感兴趣的知识和文章' className='search' />
							<div className='icon-container'>
								<Icon type='search' className='icon-search' />
							</div>
						</div>
						<div className='operate-area'>
							<Button type='danger'>写文章</Button>
							<Button type=''>动态圈</Button>
						</div>
					</div>
				</nav>
			</div>
		)
	}
}
