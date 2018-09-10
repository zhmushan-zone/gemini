import React, { Component } from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import { defaultAvatar } from '@/const'
import './personCenterFocus.scss'
const TabPane = Tabs.TabPane
@connect((state) => state, {})
export default class PersonCenterFocus extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			watchedUsers: [],
		}
	}
	async componentDidMount() {
		const watch = await this.props.userstatus.watchUsersId
		const watched = await this.props.userstatus.watchedUsersId
		// watch
		await axios({
			method: 'POST',
			url: ' /api/users/ids',
			data: watch,
		}).then((res) => {
			this.setState({
				users: res.data.data,
			})
		})
		// watched
		await axios({
			method: 'POST',
			url: ' /api/users/ids',
			data: watched,
		}).then((res) => {
			this.setState({
				watchedUsers: res.data.data,
			})
		})
	}
	render() {
		const { users,watchedUsers } = this.state
		return (
			<div className='person-center-focus'>
				<Tabs defaultActiveKey='1' onChange={this.callback} size='large'>
					<TabPane tab='我关注的' key='1'>
						<div className='concern-list'>
							<ul>
								{users &&users.length!==0? (
									users.map((v) => {
										return (
											<li className='box' key={v.id}>
												<div className='left-img'>
													<img src={v.avatar ? `/avatar/${v.avatar}` : defaultAvatar} alt='' />
												</div>
												<div className='right-c'>
													<div className='title'>{v.username}</div>
													<p className='desc'>{v.job}</p>
													<div className='fs-line'>
														<a className='first'>关注{v.watchedUsersId.length}</a>
														<a href=''>粉丝{v.watchedUsersId.length}</a>
													</div>
												</div>
											</li>
										)
									})
								) : (
									<p>
										你还没有关注人，快去<a>看文章</a>吧
									</p>
								)}
							</ul>
						</div>
					</TabPane>
					<TabPane tab='我的粉丝' key='2'>
						<div className='concern-list'>
							<ul>
								{watchedUsers&&watchedUsers.length!==0 ? (
									watchedUsers.map((v) => {
										return (
											<li className='box' key={v.id}>
												<div className='left-img'>
													<img src={v.avatar ? `/avatar/${v.avatar}` : defaultAvatar} alt='' />
												</div>
												<div className='right-c'>
													<div className='title'>{v.username}</div>
													<p className='desc'>{v.job}</p>
													<div className='fs-line'>
														<a className='first'>关注{v.watchedUsersId.length}</a>
														<a href=''>粉丝{v.watchedUsersId.length}</a>
													</div>
												</div>
											</li>
										)
									})
								) : (
									<p>
										你还没有粉丝，真难受
									</p>
								)}
							</ul>
						</div>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
