import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './articleExcellentSeven.scss'
import { ArticleType, ArticleCategory } from '@/const'
import Loading from '@/common/loading/loading.js'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
export default class articleExcellentSeven extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleWeeklyId: {},
			articleWeekly: [],
			show: true,
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
				articleWeeklyId: res.data.data,
			})
		})
		const { articleWeeklyId } = this.state
		let sortable = Object.keys(articleWeeklyId).sort((a, b) => articleWeeklyId[a] - articleWeeklyId[b])
		// 获取文章
		await axios({
			method: 'post',
			url: `/api/articles/ids`,
			data: sortable,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				articleWeekly: res.data.data,
				show: false,
			})
		})
	}
	render() {
		const { articleWeekly, show } = this.state
		return (
			<div className='article-excellent-seven-container'>
				<div className='headImg'>7日精选文章</div>
				<div className='article-wrapper'>
					{articleWeekly ? (
						articleWeekly.map((v, i) => {
							const type = []
							v.type.map((v) => {
								type.push(ArticleType[v])
							})
							return (
								<OpinionMainCenterList
									key={v.createAt}
									title={v.title}
									category={ArticleCategory[v.category]}
									see={v.viewnum}
									author={v.authorUsername}
									time={v.createAt}
									tag={type}
									coverImg={`/cover-img/${v.coverImg}`}
									articleId={v.id}
								/>
							)
						})
					) : null}
					<Loading show={show} title={'加载中.....'} />
				</div>
			</div>
		)
	}
}
