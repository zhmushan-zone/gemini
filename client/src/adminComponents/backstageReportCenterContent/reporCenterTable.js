import React, { Component } from 'react'
import { Table, Divider, Tag, Modal, message } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { getReportsList } from '@/redux/actions'
import { reportReason, reportType } from '@/const'
@connect((state) => state.report, { getReportsList })
class ReporCenterTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			reporter: '',
			reason: '',
			reportsArray: [],
			msg: '无',
		}
	}

	showModal = (item) => {
		console.log(item)
		this.setState({
			visible: true,
			reporter: item.reporter,
			reason: item.reason,
			msg: item.msg,
		})
	}

	hideModal = () => {
		this.setState({
			visible: false,
		})
	}

	// 是否包含

	isContain(arr1, arr2) {
		for (var i = arr2.length - 1; i >= 0; i--) {
			if (!arr1.includes(arr2[i])) {
				return false
			}
		}
		return true
	}
	isSimilar(showType) {
		/**showType[0,1,2,3]
		 * 0 第一个是全部type  0-7
		 * 1 问题 type 0-2
		 * 2 课程 type 3-5
		 * 3 文章 type 6-7
		 */
		if (showType.length === 4) {
			return [ 0, 1, 2, 3, 4, 5, 6, 7 ]
		} else if (this.isContain(showType, [ 1, 2 ])) {
			return [ 0, 1, 2, 3, 4, 5 ]
		} else if (this.isContain(showType, [ 1, 3 ])) {
			return [ 0, 1, 2, 6, 7 ]
		} else if (this.isContain(showType, [ 2, 3 ])) {
			return [ 3, 4, 5, 6, 7 ]
		} else if (this.isContain(showType, [ 1 ])) {
			return [ 0, 1, 2 ]
		} else if (this.isContain(showType, [ 2 ])) {
			return [ 3, 4, 5 ]
		} else if (this.isContain(showType, [ 3 ])) {
			return [ 6, 7 ]
		} else {
			return []
		}
	}
	// 交集
	intersection(arr1, arr2) {
		arr1 = Array.from(arr1, (x) => x)
		return new Set([ ...arr1, ...arr2 ]).size < arr1.length + arr2.length
	}
	// changstatus
	async changestatus(item) {
		// 该状态
		await axios({
			method: 'PUT',
			url: `/api/reports/${item.key}/status/1`,
			headers: {
				token: Cookies.get('_token'),
			},
		}).then((res) => {
			const { reportsArray } = this.state
			reportsArray[item.index].status = 1
			this.setState({
				reportsArray,
			})
		})
	}
	// 删除
	// [ '问答', '问答回复', '回答子回复', '文章', '文章评论', '文章子评论', '视频评论', '视频子评论' ]
	async deleteData(item) {
		if (item.typeNum === 0) {
			// 问答
			await axios({
				method: 'DELETE',
				url: `/api/issues/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			}).then((res) => {
				if (res.data.code === 1) {
					message.success('删除成功')
					this.changestatus(item)
				} else {
					message.warning('删除失败')
				}
			})
		} else if (item.typeNum === 1) {
			//问答回复
			await axios({
				method: 'DELETE',
				url: `/api/issues/reply/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
						this.changestatus(item)
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
		} else if (item.typeNum === 2) {
			//回答子回复
			await axios({
				method: 'DELETE',
				url: `/api/issues/subreply/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
						this.changestatus(item)
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
		} else if (item.typeNum === 3) {
			// 文章
			await axios({
				method: 'DELETE',
				url: `/api/articles/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
						this.changestatus(item)
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
		} else if (item.typeNum === 4) {
			//章评论
			await axios({
				method: 'DELETE',
				url: `/api/articles/comment/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
						this.changestatus(item)
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
		} else if (item.typeNum === 5) {
			//文章子评论
			await axios({
				method: 'DELETE',
				url: `/api/articles/comment/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
						this.changestatus(item)
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
		} else if (item.typeNum === 6) {
			//视频评论
			await axios({
				method: 'DELETE',
				url: `/api/articles/comment/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
			await this.changestatus(item)
		} else if (item.typeNum === 7) {
			//视频子评论
			await axios({
				method: 'DELETE',
				url: `/api/articles/comment/${item.key}`,
				headers: {
					token: Cookies.get('_token'),
				},
			})
				.then((res) => {
					if (res.data.code === 1) {
						message.success('删除成功')
						this.changestatus(item)
					} else {
						message.warning('删除失败')
					}
				})
				.catch((rej) => {
					message.warning('出错了，一定发生了什么奇怪的事情')
				})
		}
	}
	// 无视
	async ignore(item) {
		await this.changestatus(item)
	}

	async componentDidMount() {
		await this.props.getReportsList()
		let reports = this.props.reports
		this.setState({
			reportsArray: reports,
		})
	}
	// async componentDidMount() {
	// 	let report = this.props.report
	// 	console.log(await this.props.report)
	// 	this.setState({
	// 		report: report,
	// 	})
	// }
	render() {
		let reportsArray = this.state.reportsArray
		let Tabkey = this.props.Tabkey
		const columns = [
			{
				title: '举报者',
				dataIndex: 'reporter',
				key: 'reporter',
				render: (text) => <a>{text}</a>,
			},
			{
				title: '类型',
				key: 'type',
				dataIndex: 'type',
				render: (tags) => (
					<span>
						{tags.map((tag) => (
							<Tag color='blue' key={tag}>
								{tag}
							</Tag>
						))}
					</span>
				),
			},
			{
				title: '原因',
				key: 'reason',
				dataIndex: 'reason',
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
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<a onClick={() => this.ignore(record)}>无视 {record.name}</a>
						<Divider type='vertical' />
						<a onClick={() => this.deleteData(record)}>删除</a>
					</span>
				),
			},
		]
		const data = []
		reportsArray
			? reportsArray.map((v, i) => {
					let templateObj = {
						key: v.id,
						reporter: v.reporterUsername,
						type: [ reportType[v.type] ],
						reason: reportReason[v.reason],
						status: v.status,
						typeNum: v.type,
						index: i,
						msg: v.msg,
					}
					data.push(templateObj)
				})
			: ''
		let newReport = data.filter((item) => {
			return item.status === parseInt(Tabkey, 10)
		})
		// 0 [1,2]
		const showTypeArray = this.isSimilar(this.props.showType)
		let intersectionReport = newReport.filter((item) => {
			return this.intersection([ item.typeNum ], showTypeArray)
		})
		return (
			<React.Fragment>
				<Table columns={columns} dataSource={intersectionReport} style={{ marginTop: 30 }} />
				<Modal
					title='详情'
					visible={this.state.visible}
					onOk={this.hideModal}
					onCancel={this.hideModal}
					okText='确认'
					cancelText='取消'
				>
					<p>举报者：{this.state.reporter}</p>
					<p>举报原因：{this.state.reason}</p>
					<p>举报内容：{this.state.msg}</p>
				</Modal>
			</React.Fragment>
		)
	}
}

export default ReporCenterTable
