import React from 'react'
import { Table, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { notSetText } from '@/const.js'
import Axios from 'axios'
import Cookie from 'js-cookie'
import Loading from '@/common/loading/loading'
@withRouter
@connect((state) => state, {})
class BackstateUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			show: true,
		}
	}

	async componentDidMount() {
		if (this.props.location.pathname === '/admin/user') {
			const _id = Cookie.get('_id')
			const _token = Cookie.get('_token')
			await Axios.get('/api/users', {
				headers: {
					id: _id,
					token: _token,
				},
			}).then((res) => {
				if (res.data.code === 1) {
					res.data.data.map((v, i) => {
						if (v.role === 0) {
							const data = {
								key: v.id,
								name: v.nickname ? v.nickname : v.username,
								city: v.city ? v.city : '城市' + notSetText,
								sex: v.sex ? (v.sex === 0 ? '女' : '男') : '性别' + notSetText,
								job: v.job ? v.job : notSetText,
								description: v.signature ? v.signature : '签名' + notSetText,
								index: i,
							}
							this.state.users.push(data)
							this.setState({
								users: this.state.users,
								show: false,
							})
						}
					})
				} else {
					console.log('出错了')
				}
			})
		}
	}
	async deleteUser(item) {
		const _token = Cookie.get('_token')
		console.log(item)
		await Axios({
			method: 'DELETE',
			url: `/api/users/${item.key}`,
			headers: {
				token: _token,
			},
		})
			.then((res) => {
				if (res.data.code === 1) {
					message.success('删除成功')
					this.state.users.splice(item.index, 1)
				} else {
					message.warn('发生了一些错误')
				}
			})
			.catch((rej) => {
				message.warn('发生了一些错误')
			})
	}

	render() {
		const columns = [
			{
				title: '昵称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '职位',
				dataIndex: 'job',
				key: 'job',
			},
			{
				title: '城市',
				dataIndex: 'city',
				key: 'city',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
			},
			{
				title: '操作',
				dataIndex: '',
				key: 'x',
				render: (text, record) => <a onClick={() => this.deleteUser(record)}>删除</a>,
			},
		]
		return (
			<React.Fragment>
				<Table
					columns={columns}
					expandedRowRender={(record) => <p style={{ margin: 10 }}>{record.description}</p>}
					dataSource={this.state.users}
				/>
				{this.state.show ? <Loading /> : null}
			</React.Fragment>
		)
	}
}
export default BackstateUser
