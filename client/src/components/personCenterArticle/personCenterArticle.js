import React from 'react'
import { Tabs, Button } from 'antd'
import './personCenterArticle.scss'
import Marked from 'marked'
import Cookies from 'js-cookie'
import axios from 'axios'
const TabPane = Tabs.TabPane
const operations = <Button size='large'>写文章</Button>
class PersonCenterArticle extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			myArticle: [],
			myLove: [],
		}
	}
	callback = (key) => {
		console.log(key)
	}
	async componentDidMount() {
		const _id = Cookies.get('_id')
		// 获取我的全部文章
		await axios({
			method: 'GET',
			url: `/api/articles/author/${_id}`,
		}).then((res) => {
			this.setState({
				myArticle: res.data.data,
			})
		})
		// 获取我喜欢的文章
		await axios({
			method: 'GET',
			url: `/api/articles/upped`,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				myLove: res.data.data,
			})
		})
	}
	render() {
		const { isOwn } = this.props
		const { myArticle, myLove } = this.state
		console.log(myLove)
		return (
			<div className='person-center-article'>
				<Tabs defaultActiveKey='1' onChange={this.callback} size='large' tabBarExtraContent={operations}>
					<TabPane tab={isOwn ? '我的文章' : '他的文章'} key='1'>
						{myArticle ? (
							myArticle.map((v) => {
								return (
									<div className='article-item' key={v.id}>
										<div className='item-title'>
											<a href={`/article/${v.id}`}>{v.title}</a>
											{v.status === 0 ? <span className='unreviewed-class'>未审核</span> : null}
										</div>
										<div
											className='content'
											dangerouslySetInnerHTML={{
												__html: Marked(v.content),
											}}
										/>
										<div className='bottom'>
											<div className='right-info'>
												<span>浏览{v.viewnum}</span>
												<span>喜欢{v.upersId.length}</span>
												<span>评论{v.commentsId.length}</span>
											</div>
										</div>
									</div>
								)
							})
						) : (
							<p className='notattend'>
								你还没有任何原创文章，快去<a style={{color:'red'}}>发表文章</a>吧
							</p>
						)}
					</TabPane>
					<TabPane tab={isOwn ? '我的喜欢' : '他的喜欢'} key='3'>
						{myLove ? (
							myLove.map((v) => {
								return (
									<div className='article-item' key={v.id}>
										<div className='item-title'>
											<a href={`/article/${v.id}`}>{v.title}</a>
										</div>
										<div className='content'>
											<div>
												<img src={`/cover-img/${v.coverImg}`} alt='' />
											</div>
											<p
												dangerouslySetInnerHTML={{
													__html: Marked(v.content),
												}}
											/>
										</div>
										<div className='bottom'>
											<div className='right-info'>
												<span>浏览{v.viewnum}</span>
												<span>喜欢{v.upersId.length}</span>
												<span>评论{v.commentsId.length}</span>
											</div>
										</div>
									</div>
								)
							})
						) : (
							<p className='notattend'>
								你还没有喜欢任何文章，快去<a style={{color:'red'}}>看看文章</a>吧
							</p>
						)}
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
export default PersonCenterArticle
