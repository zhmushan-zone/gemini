import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './articleExcellentSeven.scss'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
export default class articleExcellentSeven extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleWeekly: [],
		}
	}
	async componentDidMount() {
		// 获取全部用户
		await axios({
			method: 'GET',
			url: '/api/articles/up-weekly',
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				articleWeekly: res.data.data,
			})
		})
	}
	render() {
		console.log(this.state.articleWeekly)
		return (
			<div className='article-excellent-seven-container'>
				<div className='headImg'>7日精选文章</div>
				<div className='article-wrapper'>
					{/* <OpinionMainCenterList
						key={v.createAt}
						title={v.title}
						category={ArticleCategory[v.category]}
						see={v.viewnum}
						author={v.authorUsername}
						time={v.createAt}
						tag={type}
						coverImg={`/cover-img/${v.coverImg}`}
						articleId={v.id}
					/> */}
				</div>
			</div>
		)
	}
}
