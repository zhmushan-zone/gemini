import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ArticleType, ArticleCategory } from '@/const'
import Loading from '@/common/loading/loading.js'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import './ArticleExcellentThirty.scss'
export default class ArticleExcellentThirty extends Component {
	constructor(props) {
		super(props)
		this.state = {
			articleMonthlyId: {},
			articleMonthly: [],
			show: true,
		}
	}
	async componentDidMount() {
		// 获取全部用户
		await axios({
			method: 'GET',
			url: '/api/articles/up-monthly',
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			this.setState({
				articleMonthlyId: res.data.data,
			})
		})
		const { articleMonthlyId } = this.state
		let sortable = Object.keys(articleMonthlyId).sort((a, b) => articleMonthlyId[a] - articleMonthlyId[b])
		// 获取文章
		await axios({
			method: 'post',
			url: `/api/articles/ids`,
			data: sortable,
		}).then((res) => {
			console.log(res)
			this.setState({
				articleMonthly: res.data.data,
				show: false,
			})
		})
	}
	render() {
		const { articleMonthly, show } = this.state
		console.log(articleMonthly)
		return (
			<div className='article-excellent-thirty-container'>
				<div className='headImg'>30日精选文章</div>
				<div className='article-wrapper'>
					{articleMonthly ? (
						articleMonthly.map((v, i) => {
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
					{show ? <Loading /> : null}
				</div>
			</div>
		)
	}
}
