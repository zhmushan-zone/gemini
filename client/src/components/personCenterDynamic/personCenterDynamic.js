import React from 'react'
import axios from 'axios'
import Loading from '@/common/loading/loading'
import './PersonCenterDynamic.scss'
import { withRouter } from 'react-router'
@withRouter
class PersonCenterDynamic extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activities: [],
			show: true,
			UserId: this.props.match.params.id,
		}
	}
	componentDidMount = async () => {
		axios({
			method: 'GET',
			url: `/api/users/${this.state.UserId}/activities`,
		}).then((res) => {
			this.setState({
				activities: res.data.data,
				show: false,
			})
		})
	}
	toSee(v) {
		console.log(v.type)
		const item = v.body
		if (v.type === 0 || v.type === 1 || v.type === 5) {
			this.props.history.push(`/article/${item.id}`)
		}else if (v.type === 2 || v.type === 3 || v.type === 4){
			this.props.history.push(`/forum/details/${v.srcId}`)
		}else if (v.type === 6){
			this.props.history.push(`/class/${v.srcId}`)
		}
	}

	render() {
		console.log(this.state.activities)
		let UserActivityType = [ '创建文章', '点赞文章', '创建问题', '关注问题', '回答问题', '创建文章评论', '加入课程' ]
		let { activities } = this.state
		return (
			<div className='dynamic-container'>
				<ul>
					{this.state.show ? (
						<Loading style={{ marginTop: 60 }} />
					) : (
						<React.Fragment>
							{activities.length !== 0 ? (
								activities.map((v, i) => {
									const item = v.body
									return (
										<li className='item' key={i}>
											<div className='activity'>
												<a className='link'>
													<div className='meta-box'>
														<div className='action'>{UserActivityType[v.type]}</div>
														<div className='data'>{item.createAt}</div>
													</div>
													<div className='content'>
														<div className='title' onClick={() => this.toSee(v)}>
															{v.type === 4 && v.type === 5 && v.type === 6 ? item.content : item.title}
														</div>
													</div>
												</a>
											</div>
										</li>
									)
								})
							) : (
								<p className='nodata'>暂无任何动态</p>
							)}
						</React.Fragment>
					)}
				</ul>
			</div>
		)
	}
}
export default PersonCenterDynamic
