import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'antd'
import TagSample from '../tagSample/tagSample'
import ArticleComments from '../articleComments/articleComments'
import { Modal, Input } from 'antd'
import { connect } from 'react-redux'
import Marked from 'marked'
import { defaultAvatar, ArticleType, ArticleCategory } from '@/const'
import { sendArticleComment } from '@/redux/actions.js'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import './articleLeft.scss'
import { withRouter } from 'react-router'
import Cookies from 'js-cookie'
import axios from 'axios'
const { TextArea } = Input

@withRouter
@connect((state) => state, { sendArticleComment })
export default class articleLeft extends Component {
	constructor(props) {
		super(props)
		this.state = {
			clickLike: false,
			visible: false,
			confirmLoading: false,
			categoryId: this.props.match.params.id,
			commentValue: '您的内容。。'
		}
	}

	async handleLike() {
		const _token = Cookies.get('_token')
		await axios({
			method: 'put',
			url: ` /api/articles/${this.state.categoryId}/up`,
			headers: {
				token: _token
			}
		})
		this.setState({
			clickLike: true
		})
	}

	showModal = () => {
		this.setState({
			visible: true
		})
	}

	handleOk = () => {
		this.setState({
			commentValue: '',
			confirmLoading: true
		})
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false
			})
		}, 100)
		this.props.sendArticleComment(this.state.categoryId, this.state.commentValue)
	}

	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	handleChange = (key, e) => {
		this.setState({
			[key]: e.target.value
		})
	}

	render() {
		const { visible, confirmLoading, commentValue, clickLike } = this.state
		let { title, coverImg, content, type, userstatus } = this.props
		let articleData = this.props.articleData
		let thisArticle = this.props.article.article
		let { upersId } = thisArticle
		try {
			var con = Marked(content)
			var Tag = type.map((v, i) => {
				return <TagSample name={v} key={i} />
			})
		} catch (error) {}
		const _id = Cookies.get('_id')
		return (
			<div className='left-article-container'>
				<Breadcrumb>
					<Breadcrumb.Item href=''>
						<span>手记</span>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<span>{ArticleCategory[thisArticle.category]}</span>
					</Breadcrumb.Item>
				</Breadcrumb>
				<img src={`/cover-img/${coverImg}`} className='cover-img' alt='' />
				<div className='title'>
					<h2 className='detail-title'>{title}</h2>
					<div className='dc-profile'>
						<div className='l'>
							<span style={{ marginRight: 10 }}>{thisArticle.createAt}</span>
							<span className=''>126浏览</span>
						</div>
					</div>
					<div
						className='content'
						dangerouslySetInnerHTML={{
							__html: con
						}}
					/>
					<hr />

					{/* 标签 */}
					<div className='cat-box'>{Tag}</div>
					{/* 推荐 */}

					{upersId?upersId.indexOf(_id) === -1 && !clickLike ? (
						<div className='praise-box'>
							<button className={`js-praise`} onClick={this.handleLike.bind(this)}>
								<Icon type='star' />
							</button>
							<div className='num-person'>
								<em className='num'>{upersId.length}</em>人推荐
							</div>
						</div>
					) : (
						<div className='praise-box'>
							<button className='js-praise like' onClick={this.handleLike.bind(this)}>
								<Icon type='star' className='like' />
							</button>
							<div className='num-person'>
								<em className='num'>{upersId.length + 1}</em>人推荐
							</div>
						</div>
					):null}

					{/* 评论 */}
					<div id='comment'>
						<div className='author'>
							<img src={userstatus.avatar ? `/avatar/${userstatus.avatar}` : defaultAvatar} alt='' />
						</div>
						<p className='fadeInput' onClick={this.showModal}>
							共同学习，写下你的评论
						</p>
					</div>
					{/* 评论框 */}
					<Modal
						title='评论'
						visible={visible}
						onOk={this.handleOk}
						confirmLoading={confirmLoading}
						onCancel={this.handleCancel}
						okText='确认'
						cancelText='取消'
					>
						<TextArea rows={6} value={commentValue} onChange={this.handleChange.bind(this, 'commentValue')} />
					</Modal>
					{/* 评论 */}
					{/* <div id='all-comments'>暂无评论</div> */}
					<ArticleComments articleId={this.state.categoryId} />
					{/* article- */}
					<div className='article_wrap'>
						<div className='line-con'>
							<p className='line' />
							<p className='line-text'>相关文章推荐</p>
						</div>
						{articleData ? (
							articleData.map((v, i) => {
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
						) : (
							''
						)}
					</div>
				</div>
			</div>
		)
	}
}
