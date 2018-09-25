import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Select } from 'antd'
import BackstageTag from '../backstageTag/backstageTag'
import { ArticleCategoryAll } from '@/const.js'
import './backstageArticle.scss'
import axios from 'axios'
import Cookies from 'js-cookie'
import BackstateArticleItem from '../backstateArticleItem/backstateArticleItem'
import Loading from '@/common/loading/loading'
const Search = Input.Search
const Option = Select.Option
@connect((state) => state.article, {})
export default class BackstageArticle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// [0,1,3,4,...]
			showType: Array.from({ length: ArticleCategoryAll.length }, (v, i) => i),
			articles: [],
			users: [],
			selectUser: [],
			show: true,
		}
		this.stateChange = this.stateChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	async componentDidMount() {
		// 获取全部用户
		let res = await axios({
			method: 'GET',
			url: '/api/users',
			headers: {
				token: Cookies.get('_token'),
			},
		})
		if (res.data.code === 1) {
			await this.setState({
				users: res.data.data,
			})
		}
		// 获取文章
		await axios({
			method: 'GET',
			url: '/api/articles',
		}).then((res) => {
			this.setState({
				articles: res.data.data,
				show: false,
			})
		})
	}

	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
	}
	handleChange(value) {
		this.setState({
			selectUser: value,
		})
	}

	isSimilar2(string, arr2) {
		if (arr2.length === 0) {
			return true
		}
		return arr2.includes(string)
	}

	isSimilar(arr1, num) {
		arr1 = Array.from(arr1, (x) => x)
		return arr1.includes(num)
	}

	render() {
		const { users, articles, show } = this.state
		const tagItems = ArticleCategoryAll.map((item, index) => {
			return (
				<BackstageTag
					type={index}
					key={index}
					len={ArticleCategoryAll.length}
					showType={this.state.showType}
					stateChange={this.stateChange}
				>
					{item}
				</BackstageTag>
			)
		})
		// 用户选择
		const children = []
		users.map((v, i) => {
			children.push(<Option key={v.username}>{v.username}</Option>)
		})

		const articleSimilar = articles.filter(
			(item) =>
				this.isSimilar(this.state.showType, item.category) &&
				this.isSimilar2(item.authorUsername, this.state.selectUser)
		)

		return (
			<div className='back-article-container'>
				<div className='backstage-article-list-top'>
					<Search placeholder='请输入' enterButton='搜索' size='large' onSearch={(value) => console.log(value)} />
				</div>
				<div className='backstage-article-type-check'>
					<div className='check'>
						<div className='backstage-article-type-check-title'>所属类目:</div>
						<div className='backstage-article-type-check-content'>{tagItems}</div>
					</div>
					<div className='backstage-article-select-user'>
						<div className='backstage-article-type-check-title'>选择用户:</div>
						<Select
							mode='multiple'
							style={{ width: '100%' }}
							placeholder='请选择用户(不选即为全部)'
							defaultValue={[ '所有用户' ]}
							onChange={this.handleChange}
						>
							{children}
						</Select>
					</div>
				</div>

				<div className='backstage-article-content'>
					{articleSimilar ? (
						articleSimilar.map((item, i) => {
							return (
								<BackstateArticleItem
									authorName={item.authorUsername}
									authorAvatar={item.authorAvatar}
									category={item.category}
									title={item.title}
									type={item.type}
									content={item.content}
									createTime={item.createAt}
									viewNum={item.viewnum}
									key={item.id}
								/>
							)
						})
					) : (
						<p style={{ color: 'rgba(0,0,0,.45)', textAlign: 'center' }}>暂无数据</p>
					)}
				</div>

				{show ? <Loading /> : null}
			</div>
		)
	}
}
