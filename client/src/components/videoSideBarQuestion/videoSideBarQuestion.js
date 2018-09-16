import React, { Component } from 'react'
import { Input, Button } from 'antd'
import ProblemEditor from '../CreateProblemItems/problemEditor/problemEditor'
import CustomIcon from '@/common/customIcon/customIcon'
import { createProblem } from '@/redux/actions'
import './videoSideBarQuestion.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
@withRouter
@connect((state) => state, { createProblem })
export default class VideoSideBarQuestion extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content: '',
			title: '',
			tags:[0,1],
			bindCourseId:this.props.match.params.courseId
		}
		this.stateChange = this.stateChange.bind(this)
	}
	componentDidMount() {
		
	}
	handleChange(key, e) {
		this.setState({
			[key]: e.target.value,
		})
	}
	Change(value) {
		this.setState({
			textValue: value,
		})
	}
	handleSubmit = () => {
		this.props.createProblem(this.state)
	}
	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
	}
	render() {
		return (
			<div className='side-bar-question-container'>
				<div className='top'>
					<h2>提问题</h2>
					<span onClick={this.props.closeNoteorQues}>
						<CustomIcon type='x' color='black' size={24} className='delete' />
					</span>
				</div>
				<Input
					size='large'
					placeholder='请输入您的问题'
					className='question'
					value={this.state.title}
					onChange={this.handleChange.bind(this, 'title')}
				/>
				{/* <SimpleMDE
          onChange={this.Change.bind(this)}
          value={this.state.textValue}
        /> */}
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
						'emoticon', // 表情
						'table', // 表格
						'code', // 插入代码
					]}
				/>
				<p className='button-p'>
					<Button type='primary' onClick={this.handleSubmit}>
						提交
					</Button>
				</p>
			</div>
		)
	}
}
