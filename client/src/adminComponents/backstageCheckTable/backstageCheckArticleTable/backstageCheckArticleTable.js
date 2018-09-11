import React, { Component } from 'react'
import BackstageArticleModal from '../../backstageModal/backstageArticleModal/backstageArticleModal'
import { Table, Divider, Tag, Modal, message, Input } from 'antd'
import { connect } from 'react-redux'
import { ArticleType as Type, ArticleCategory } from '@/const'
import { fetchArticleAll, articleAccept, deleteArticle } from '@/redux/actions'
import { dateSortByCreate } from '@/util/dateSort'
const confirm = Modal.confirm
const { TextArea } = Input
@connect((state) => state.article, { fetchArticleAll, articleAccept, deleteArticle })
class BackstageCheckArticleTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			userName: '',
			userAvatar: '',
			title: '',
			content: '',
			disagreeReason: '',
		}
	}
	async componentDidMount() {
		this.props.fetchArticleAll()
	}
	showModal = (item) => {
		this.setState({
			userName: item.author,
			userAvatar: item.avatar,
			title: item.title,
			content: item.content,
			visible: true,
		})
	}
	
	handleCancel = (e) => {
		this.setState({
			visible: false,
		})
	}
	agree(id) {
		confirm({
			title: '请确认您的操作',
			content: '您是否要批准该条请求，请您确认',
			onOk: () => {
				return new Promise(async (resolve, reject) => {
					await this.props.articleAccept(id)
					resolve(1)
				}).then((res) => {
					message.success('该请求已通过')
				})
			},
			onCancel() {},
		})
	}

	disagree(id) {
		confirm({
			title: '您确定要拒绝该请求吗',
			content: (
				<TextArea placeholder='请输入拒绝的原因' autosize onChange={(e) => this.setState({ disagreeReason: e.target.value })} />
			),
			onOk: () => {
				return new Promise(async (resolve, reject) => {
					await this.props.deleteArticle(id)
					resolve(1)
				}).then((res) => {
					message.success('该请求已被拒绝')
				})
			},
			onCancel() {},
		})
	}
	render() {
		const columns = [
			{
				title: '标题',
				key: 'title',
				dataIndex: 'title',
			},
			{
				title: '作者',
				dataIndex: 'author',
				key: 'author',
				render: (text) => <a>{text}</a>,
			},
			{
				title: '类型',
				key: 'category',
				dataIndex: 'category',
			},
			{
				title: '标签',
				key: 'tags',
				dataIndex: 'type',
				render: (type) => (
					<span>
						{type.map((v) => (
							<Tag color='blue' key={v}>
								{Type[v]}
							</Tag>
						))}
					</span>
				),
			},
			{
				title: '内容',
				key: 'details',
				dataIndex: 'details',
				render: (text, record) => (
					<span>
						<a onClick={() => this.showModal(record)}>详情</a>
					</span>
				),
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record) => (
					<span>
						<a style={{ color: '#5fcf9a' }} onClick={() => this.agree(record.id)}>
							批准
						</a>
						<Divider type='vertical' />
						<a style={{ color: 'rgba(240, 20, 20, 0.8)' }} onClick={() => this.disagree(record.id)}>
							拒绝
						</a>
					</span>
				),
			},
		]

		const data = []
		if (this.props.articleArray) {
			// const article = this.props.articleArray.filter(item => item.status === 0)
			const article = this.props.articleArray
			article.map((item, index) => {
				const articlemData = {}
				articlemData.key = `${index + 1}`
				articlemData.author = item.authorUsername
				articlemData.title = item.title
				articlemData.category = ArticleCategory[item.category]
				articlemData.type = item.type
				articlemData.content = item.content
				articlemData.avatar = item.authorAvatar
				articlemData.id = item.id
				data.push(articlemData)
			})
		}
		return (
			<React.Fragment>
				<Table columns={columns} dataSource={data.length ? data : null} style={{ marginTop: 30 }} />
				<BackstageArticleModal
					visible={this.state.visible}
					handleCancel={this.handleCancel}
					userName={this.state.userName}
					userAvatar={this.state.userAvatar}
					title={this.state.title}
					content={this.state.content}
				/>
			</React.Fragment>
		)
	}
}

export default BackstageCheckArticleTable
