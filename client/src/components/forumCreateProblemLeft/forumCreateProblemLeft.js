import React, { Component } from 'react'
import { message } from 'antd'
import ProblemEditor from '../CreateProblemItems/problemEditor/problemEditor'
import ProblemTags from '../CreateProblemItems/problemTags/problemTags'
import { createProblem } from '@/redux/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './forumCreateProblemLeft.scss'

@withRouter
@connect((state) => state.problem, { createProblem })
class ForumCreateProblemLeft extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			content: '',
			tags: [],
		}
		this.stateChange = this.stateChange.bind(this)
	}

	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
	}

	async problemSubmit() {
		const { title, content, tags } = this.state
		if (!title || !content || !tags.length) {
			return message.error('请完善你的问题后再尝试提交')
		}
		await this.props.createProblem(this.state)
		if (this.props.code === 1) {
			message.success(this.props.msg)
			setTimeout(() => {
				this.props.history.push('/forum')
			}, 3000)
		} else {
			return message.error(this.props.msg)
		}
	}

	render() {
		return (
			<div className='forum-create-problem-left'>
				<h2>提问</h2>
				<input
					className='create-problem-title'
					type='text'
					placeholder='请用一句话简述你的问题'
					onChange={(e) => this.stateChange('title', e.target.value)}
				/>
				<ProblemEditor
					descChange={this.stateChange}
					menu={[
						'head', // 标题
						'bold', // 粗体
						'fontSize', // 字号
						'fontName', // 字体
						'italic', // 斜体
						'underline', // 下划线
						'strikeThrough', // 删除线
						'foreColor', // 文字颜色
						'backColor', // 背景颜色
						'link', // 插入链接
						'list', // 列表
						'justify', // 对齐方式
						'quote', // 引用
						'emoticon', // 表情
						'image', // 插入图片
						'table', // 表格
						'code', // 插入代码
						'undo', // 撤销
						'redo', // 重复
					]}
				/>
				<ProblemTags tagsChange={this.stateChange} type={this.state.tags} />
				<div className='problem-submit-wrapper'>
					<button className='problem-submit' onClick={() => this.problemSubmit()}>
						发布问题
					</button>
				</div>
			</div>
		)
	}
}

export default ForumCreateProblemLeft
