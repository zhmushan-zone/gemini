import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Icon, Select } from 'antd'
import BackstageTag from '../backstageTag/backstageTag'
import { ArticleCategoryAll } from '@/const.js'
import './backstageArticle.scss'
import axios from 'axios'
import Cookies from 'js-cookie'
const Search = Input.Search
const Option = Select.Option
@connect((state) => state.problem, {})
export default class BackstageArticle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showType: Array.from({ length: ArticleCategoryAll.length }, (v, i) => i),
			problems: [],
			users: []
		}
		this.stateChange = this.stateChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	async componentDidMount() {
		await axios({
			method: 'GET',
			url: '/api/users',
			headers: {
				token: Cookies.get('_token')
			}
		}).then((res) => {
			this.setState({
				users: res.data.data
			})
		})
	}

	stateChange(key, value) {
		this.setState({
			[key]: value
		})
	}
	handleChange(value) {
		console.log(`selected ${value}`)
	}

	render() {
		const { users } = this.state
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
    users.map((v,i)=>{
      children.push(<Option key={i.toString(36) + i}>{v.username}</Option>)
    })
    
		return (
			<div className='back-article-container'>
				<div className='backstage-article-list-top'>
					<Search placeholder='请输入' enterButton='搜索' size='large' onSearch={(value) => console.log(value)} />
				</div>
				<div className='backstage-article-type-check'>
					<div className='backstage-article-type-check-title'>所属类目:</div>
					<div className='backstage-article-type-check-content'>{tagItems}</div>
				</div>
				<div className='backstage-article-select-user'>
					<div className='backstage-article-type-check-title'>选择用户:</div>
					<Select
						mode='multiple'
						style={{ width: '100%' }}
						placeholder='不选择则为全部用户'
						defaultValue={["admin"]}
						onChange={this.handleChange}
					>
						{children}
					</Select>
				</div>
				<div className='backstage-article-content' />
			</div>
		)
	}
}
