import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'antd'
import TagSample from '../tagSample/tagSample'
import ArticleComments from '../articleComments/articleComments'
import { Modal, Input } from 'antd'
import { connect } from 'react-redux'
import Marked from 'marked'
import { defaultAvatar, ArticleType, ArticleCategory } from '@/const'
import { sendArticleComment, fetchArticleUp } from '@/redux/actions.js'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import './articleLeft.scss'
import { withRouter } from 'react-router'
import Cookies from 'js-cookie'
import Share from '@/share'
import axios from 'axios'
const { TextArea } = Input

@withRouter
@connect((state) => state, { sendArticleComment, fetchArticleUp })
export default class articleLeft extends Component {
	constructor(props) {
		super(props)
		this.state = {
			clickLike: false,
			visible: false,
			confirmLoading: false,
			categoryId: this.props.match.params.id,
			commentValue: '您的内容。。',
			upersId: [],
		}
	}
	componentDidMount() {
		const { upersId } = this.props.thisArticle
		console.log(this.props.thisArticle)
		this.setState({
			upersId: upersId,
		})
	}

	async handleLike() {
		const _id = await Cookies.get('_id')
		const res = await axios({
			method: 'PUT',
			url: `/api/articles/${this.state.categoryId}/up`,
			headers: {
				token: Cookies.get('_token'),
			},
		})
		if (res.data.code === 1) {
			const { upersId } = this.props.thisArticle
			const index = upersId.indexOf(_id)
			if (index === -1) {
				this.state.upersId.push(_id)
				this.setState({
					upersId,
				})
			} else {
				upersId.splice(index, 1)
				this.setState({
					upersId,
				})
			}
		} else {
			console.log('服务器出故障了')
		}
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	handleOk = () => {
		this.setState({
			commentValue: '',
			confirmLoading: true,
		})
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			})
		}, 100)
		this.props.sendArticleComment(this.state.categoryId, this.state.commentValue)
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		})
	}
	handleChange = (key, e) => {
		this.setState({
			[key]: e.target.value,
		})
	}

	render() {
		const { visible, confirmLoading, commentValue, upersId } = this.state
		let { userstatus } = this.props
		let articleData = this.props.articleData
		let thisArticle = this.props.thisArticle
		let { content, title, type,id } = thisArticle
		try {
			var con = Marked(content)
			var Tag = type.map((v, i) => {
				return <TagSample name={v} key={i} />
			})
		} catch (error) {}
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
				<div className='title'>
					<h2 className='detail-title'>{title}</h2>
					<div className='dc-profile'>
						<div className='l'>
							<span style={{ marginRight: 10 }}>{thisArticle.createAt}</span>
							<span className=''>{thisArticle.viewnum}浏览</span>
						</div>
					</div>
					<div
						className='content'
						dangerouslySetInnerHTML={{
							__html: con,
						}}
					/>
					<hr />

					{/* 标签 */}
					<div className='cat-box'>{Tag}</div>
					{/* 推荐 */}
					<div className='praise-box'>
						<button className={`js-praise`} onClick={this.handleLike.bind(this)}>
							<Icon type='star' />
						</button>
						<div className='num-person'>
							<em className='num'>{upersId.length}</em>人推荐
						</div>
					</div>
					<div className='article-page-share'>
						<a onClick={() => Share.shareToQQZone(title, `/article/${id}/`)}>
							<Icon type='qq' color='#b6b9bc' size={26} />
						</a>
						<a onClick={() => Share.shareToDouban(title, `/article/${id}/`)}>
							<Icon type='douban_F' color='#b6b9bc' size={24} />
						</a>
						<a onClick={() => Share.shareToWeibo(title, `/article/${id}/`)}>
							<Icon type='weibo' color='#b6b9bc' size={24} />
						</a>
					</div>

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
