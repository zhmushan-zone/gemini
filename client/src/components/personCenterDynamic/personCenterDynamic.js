import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '@/common/loading/loading'
import './PersonCenterDynamic.scss'
class PersonCenterDynamic extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activities: [],
			show: true,
		}
	}
	componentDidMount = async () => {
		setTimeout(() => {
			axios({
				method: 'GET',
				url: '/api/users/activities',
				headers: {
					token: Cookies.get('_token'),
				},
			}).then((res) => {
				this.setState({
					activities: res.data.data,
					show: false,
				})
			})
		}, 1000)
	}

	render() {
		let UserActivityType = [ '创建文章', '点赞文章', '创建问题', '关注问题', '回答问题', '创建文章评论', '加入课程' ]
		let { activities } = this.state
		console.log(activities)
		return (
			<div className='dynamic-container'>
				{/* <p className="nodata">暂无任何动态</p> */}
				<ul>
					{activities ? (
						activities.map((v) => {
							const item = v.body
							console.log(item)
							console.log(v.type)
							return (
								<li className='item' key={item.srcId}>
									<div className='activity'>
										<a className='link'>
											<div className='meta-box'>
												<div className='action'>{UserActivityType[v.type]}</div>
												<div className='data'>{item.createAt}</div>
											</div>
											<div className='content'>
												<div className='title'>
													{v.type === 4 && v.type === 5 && v.type === 6 ? item.content : item.title}
												</div>
											</div>
										</a>
									</div>
								</li>
							)
						})
					) : null}
				</ul>
				{this.state.show ? <Loading /> : null}
			</div>
		)
	}
}
export default PersonCenterDynamic
