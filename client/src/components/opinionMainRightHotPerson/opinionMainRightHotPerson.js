import React, { Component } from 'react'
import './opinionMainRightHotPerson.scss'
export default class opinionMainRightHotPerson extends Component {
	constructor(props) {
		super(props)
		this.state = {
			follow: false
		}
	}
	handleFollow() {
		this.setState({
			follow: !this.state.follow
		})
	}
	render() {
		return (
			<div className='recommended_author'>
				<div className='top'>
					<h3>推荐作者</h3>
					<div className='more'>更多</div>
				</div>
				<ul className='personList'>
					<li className='person'>
						<div className='left'>
							<div className='imgCon avatar'>
								<img src='https://img2.mukewang.com/5b696b9f00012c1a20002000-200-200.jpg' alt='' />
							</div>
							<div className='text_author'>
								<div className='name'>啊麻烦的</div>
								<p>
									<span className='margin-right-40'>40篇文章</span>
									<span>130个推荐</span>
								</p>
							</div>
						</div>
						<div className='right'>
							<button className='follow' onClick={this.handleFollow.bind(this)}>
								{this.state.follow ? '已关注' : '关注'}
							</button>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}
