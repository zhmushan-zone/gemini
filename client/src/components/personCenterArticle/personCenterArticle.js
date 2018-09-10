import React from 'react'
import { Tabs, Button } from 'antd'
import './personCenterArticle.scss'
import Cookies from 'js-cookie'
import axios from 'axios'
const TabPane = Tabs.TabPane
const operations = <Button size='large'>写文章</Button>
class PersonCenterArticle extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			myArticle: [],
		}
	}
	callback = (key) => {
		console.log(key)
	}
	async componentDidMount() {
		const _id = Cookies.get('_id')
		// 获取全部用户
		await axios({
			method: 'GET',
			url: `/api/articles/author/${_id}`,
		}).then((res) => {
			this.setState({
				myArticle: res.data.data,
			})
		})
	}
	render() {
		const { isOwn } = this.props
		const { myArticle } = this.state
		console.log(myArticle)
		return (
			<div className='person-center-article'>
				<Tabs defaultActiveKey='1' onChange={this.callback} size='large' tabBarExtraContent={operations}>
					<TabPane tab={isOwn ? '我的文章' : '他的文章'} key='1'>
						<ul>
							{myArticle ? (
								myArticle.map((v) => {
									return (
										<li className='my-article' key={v.id}>
											<div>
												<img src={`/cover-img/${v.coverImg}`} alt='' />
											</div>
											<div className='content'>{v.content}</div>
										</li>
									)
								})
							) : (
								<p className='notattend'>
									你还没有任何原创文章，快去<a>发表文章</a>吧
								</p>
							)}
						</ul>
					</TabPane>
					<TabPane tab={isOwn ? '我的喜欢' : '他的喜欢'} key='3'>
						<p className='notattend'>
							你还没有任何推荐，可以先去<a>看看文章</a>
						</p>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
export default PersonCenterArticle
