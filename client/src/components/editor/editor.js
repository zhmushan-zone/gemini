import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import axios from 'axios'
import Cookies from 'js-cookie'
import { publishArticle, removeMsg } from '@/redux/actions.js'
import { connect } from 'react-redux'
import { Button, Alert } from 'antd'
import EditorHeader from '../editorHeader/editorHeader'
import CustomIcon from '@/common/customIcon/customIcon'
import MyTag from '../tag/tag'
import 'simplemde/dist/simplemde.min.css'
import './editor.scss'
@connect((state) => state, { publishArticle, removeMsg })
class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articleName: '',
			articleContent: '',
			// 后端返回的img
			articleImage: '',
			articleTag: [],
			imgurl: ''
		}
	}
	handleChange(value) {
		this.setState({
			articleContent: value
		})
	}
	handleChecked(check, text, index) {
		if (check) {
			this.state.articleTag.push(index)
			this.setState({
				articleTag: this.state.articleTag
			})
		} else {
			this.state.articleTag.map((v) => {
				if (v === index) {
					this.state.articleTag.splice(index, 1)
					this.setState({
						articleTag: this.state.articleTag
					})
				}
				return null
			})
		}
	}
	// 关闭提示
	handleErrorClose = () => {
		this.props.removeMsg()
	}
	geteditorHeader = (articleName) => [
		this.setState({
			articleName: articleName
		})
	]
	// 选择封面
	selectCover = () => {
		let _this = this
		let bodyFormData
		document.getElementById('fengmian').addEventListener('change', () => {
			var fengmian = document.getElementById('fengmian').files[0]
			bodyFormData = new FormData()
			bodyFormData.set('coverImg', fengmian)
			var reader = new FileReader()
			reader.readAsDataURL(fengmian)
			reader.onload = function(e) {
				var txt = e.target.result
				_this.setState({
					imgurl: txt
				})
			}
			axios({
				method: 'POST',
				url: '/api/files/cover-img',
				data: bodyFormData,
				headers: {
					'Content-Type': 'multipart/form-data',
					token: Cookies.get('_token')
				}
			})
				.then((res) => {
					console.log(res)
					if (res.data.code === 1) {
						// 图片
						this.setState({
							articleImage: res.data.data
						})
					}
				})
				.catch(function(res) {
					console.log(res)
				})
		})
	}
	sendArticle = async () => {
		await this.props.publishArticle(this.state)
	}

	render() {
		const category = [
			'JavaScript',
			'Node.js',
			'Vue',
			'react',
			'angular',
			'html',
			'css',
			'jquery',
			'bootstrap',
			'前端工具',
			'sass',
			'less',
			'java',
			'python',
			'go',
			'php',
			'ruby',
			'thinkphp',
			'c',
			'c++',
			'spring boot',
			'Yli',
			'算法',
			'数据库',
			'android',
			'ios',
			'大数据',
			'人工智能',
			'机器学习',
			'产品',
			'设计'
		]
		return (
			<div className="editorContainer">
				{/* 提示 */}
				<div className="error-msg">
					{this.props.userstatus.msg ? (
						<Alert
							description={this.props.userstatus.msg}
							type="error"
							showIcon
							className="errorMsg"
							closable
							afterClose={this.handleErrorClose}
						/>
					) : null}
				</div>
				<EditorHeader editorHeader={(articleName) => this.geteditorHeader(articleName)} />
				<SimpleMDE onChange={this.handleChange.bind(this)} value={this.state.articleContent} />

				{/* 上传封面 */}
				<div className="upload-pic-box">
					<span className="needed">文章封面</span>
					<span className="err-tip" />
					<div className="face-upload-box">
						<input type="file" id="fengmian" className="cover" />
						<label htmlFor="fengmian" onClick={this.selectCover}>
							{this.state.imgurl ? (
								<img src={this.state.imgurl} style={{ width: 200, height: 200 }} alt="" />
							) : (
								<CustomIcon type="camera-b" size={80} />
							)}
						</label>
						<span className="l pic-tip">
							封面图规格：<br />尺寸为200*200像素，格式为 PNG/JPG/GIF,小于等于80KB{' '}
						</span>
					</div>
				</div>
				<div className="category">
					<span className="needed">文章分类</span>
					<div>
						{category.map((v, index) => {
							return (
								<MyTag
									key={v}
									index={index}
									text={v}
									getChecked={(check, text, index) => this.handleChecked(check, text, index)}
								/>
							)
						})}
					</div>
					<p>
						<Button type="danger" size={'large'} ghost onClick={this.sendArticle}>
							发表文章
						</Button>
					</p>
				</div>
			</div>
		)
	}
}
export default Editor
