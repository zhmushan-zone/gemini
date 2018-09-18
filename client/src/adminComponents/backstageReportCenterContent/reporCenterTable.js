import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd'
import { reportReason, reportType } from '@/const'
class ReporCenterTable extends Component {
	constructor(props) {
		super(props)
		this.state = {}
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
	// 删除
	deleteData(item) {
		console.log(item)
	}
	render() {
		let report = this.props.report
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
						<a onClick={() => this.showModal()}>详情</a>
					</span>
				),
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
						<a>无视 {record.name}</a>
						<Divider type='vertical' />
						<a onClick={() => this.deleteData(record)}>删除</a>
					</span>
				),
			},
		]
		const data = []
		report.map((v) => {
			let templateObj = {
				key: v.id,
				reporter: v.reporterUsername,
				type: [ reportType[v.type] ],
				reason: reportReason[v.reason],
				status: v.status,
				typeNum: v.type,
			}
			data.push(templateObj)
		})
		let newReport = data.filter((item) => {
			return item.status === parseInt(Tabkey, 10)
		})
		// 0 [1,2]
		const showTypeArray = this.isSimilar(this.props.showType)
		console.log(newReport)
		let intersectionReport = newReport.filter((item) => {
			return this.intersection([ item.typeNum ], showTypeArray)
		})
		return <Table columns={columns} dataSource={intersectionReport} style={{ marginTop: 30 }} />
	}
}

export default ReporCenterTable
