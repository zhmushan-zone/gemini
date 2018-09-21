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

	render() {
		let UserActivityType = [ '创建文章', '点赞文章', '创建问题', '关注问题', '回答问题', '创建文章评论', '加入课程' ]
		let { activities } = this.state
		return (
			<div className='dynamic-container'>
				{/* <p className="nodata">暂无任何动态</p> */}
				<ul>
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
