import React, { Component } from 'react'
import { Tabs } from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'
import './personCenterYuanwen.scss'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
const TabPane = Tabs.TabPane
@withRouter
@connect((state) => state, {})
export default class PersonCenterYuanwen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			myIssues: [],
			myReplyIssues: [],
			myReplyIssuesId: [],
			userId: this.props.match.params.id,
			myfocus: [],
		}
	}
	async componentDidMount() {
		const { userId } = this.state
		// 获取我发表的问题
		await axios({
			method: 'GET',
			url: `/api/issues/author/${userId}`,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				myIssues: res.data.data,
			})
		})

		// 获取我回答的问题
		await axios({
			method: 'GET',
			url: `/api/issues/reply/author/${userId}`,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				myReplyIssuesId: res.data.data,
			})
		})
		console.log(this.props.userstatus.watchIssuesId)

		// 我的回答
		await axios({
			method: 'post',
			url: `/api/issues/ids`,
			data: this.state.myReplyIssuesId,
		}).then((res) => {
			this.setState({
				myReplyIssues: res.data.data,
			})
		})

		// 获取我的关注
		await axios({
			method: 'post',
			url: `/api/issues/ids`,
			data: this.props.userstatus.watchIssuesId,
		}).then((res) => {
			this.setState({
				myfocus: res.data.data,
			})
		})
	}
	render() {
		const { myIssues, myReplyIssues, myfocus } = this.state
		const { isOwn } = this.props
		console.log(myReplyIssues)
		return (
			<div className='person-center-yuanwen'>
				<Tabs defaultActiveKey='1' onChange={this.callback} size='large'>
					<TabPane tab={isOwn ? '我的提问' : '他的提问'} key='1'>
						{myIssues.length > 0 ? (
							myIssues.map((v) => {
								return (
									<div className='article-item' key={v.id}>
										<div className='item-title'>
											<img src={require(`@/assets/forumIcon/${v.tags[0]}.jpg`)} alt='' />
											<a href={`/article/${v.id}`}>{v.title}</a>
											{v.status === 0 ? <span className='unreviewed-class'>未审核</span> : null}
										</div>
										<div
											className='content'
											dangerouslySetInnerHTML={{
												__html: v.content,
											}}
										/>
										<div className='bottom'>
											<div className='right-info'>
												<span>浏览{v.viewnum}</span>
												<span>评论{v.replysId.length}</span>
												<span>时间{v.updateAt}</span>
											</div>
										</div>
									</div>
								)
							})
						) : (
							<p className='notattend'>
								你还没有任何原创文章，快去<a>发表文章</a>吧
							</p>
						)}
					</TabPane>
					<TabPane tab={isOwn ? '我的回答' : '他的回答'} key='2'>
						{myReplyIssues.length > 0 ? (
							myReplyIssues.map((v) => {
								return (
									<div className='article-item' key={v.id}>
										<div className='item-title'>
											<img src={require(`@/assets/forumIcon/${v.tags[0]}.jpg`)} alt='' />
											<a href={`/article/${v.id}`}>{v.title}</a>
											{v.status === 0 ? <span className='unreviewed-class'>未审核</span> : null}
										</div>
										<div
											className='content'
											dangerouslySetInnerHTML={{
												__html: v.content,
											}}
										/>
										<div className='bottom'>
											<div className='right-info'>
												<span>浏览{v.viewnum}</span>
												{/* <span>评论{v.replysId.length}</span> */}
												<span>时间{v.updateAt}</span>
											</div>
										</div>
									</div>
								)
							})
						) : (
							<p className='notattend'>
								你还没有任何回答，快去<a>发表文章</a>吧
							</p>
						)}
					</TabPane>
					<TabPane tab={isOwn ? '我的关注' : '他的关注'} key='3'>
						{myfocus.length > 0 ? (
							myfocus.map((v) => {
								return (
									<div className='article-item' key={v.id}>
										<div className='item-title'>
											<img src={require(`@/assets/forumIcon/${v.tags[0]}.jpg`)} alt='' />
											<a href={`/article/${v.id}`}>{v.title}</a>
										</div>
										<div
											className='content'
											dangerouslySetInnerHTML={{
												__html: v.content,
											}}
										/>
										<div className='bottom'>
											<div className='right-info'>
												<span>浏览{v.viewnum}</span>
												{/* <span>评论{v.replysId.length}</span> */}
												<span>时间{v.updateAt}</span>
											</div>
										</div>
									</div>
								)
							})
						) : (
							<p className='notattend'>
								你还没有任何关注，快去<a>发表文章</a>吧
							</p>
						)}
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
