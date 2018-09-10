import React from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Radio, message } from 'antd'
import './PersonCenterInformation.scss'
import { changePersonMsg } from '@/redux/actions'
import CustomIcon from '@/common/customIcon/customIcon'
import {notSetText} from  '@/const'
@connect((state) => state, { changePersonMsg })
class PersonCenterInformation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			confirmLoading: false,
			sex: 1,
			username: '',
			job: '',
			signature: '',
			city: ''
		}
	}
	success = () => {
		message.success('修改成功')
	}

	showModal = () => {
		this.setState({
			visible: true
		})
	}
	//点击确认
	async handleOk() {
		this.setState({
			confirmLoading: true
		})
		await this.props.changePersonMsg(this.state)
		this.props.userstatus.msg === '成功' ? this.success() : null
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false
			})
		}, 100)
	}
	// 取消修改信息
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}

	// 表单信息
	handleChange = (key, event) => {
		this.setState({
			[key]: event.target.value
		})
	}

	render() {
		const { visible, confirmLoading, sex, username, job, signature, city } = this.state
		const {userstatus,isOwn} = this.props
		const { TextArea } = Input
		const RadioGroup = Radio.Group
		const information = [
			{
				name: '昵称',
				value: userstatus.username ? userstatus.username : userstatus.nickname
			},
			{
				name: '职位',
				value: userstatus.job ? userstatus.job : notSetText
			},
			{
				name: '城市',
				value: userstatus.city ? userstatus.city : notSetText
			},
			{
				name: '性别',
				value: userstatus.sex ? (userstatus.sex === 1 ? '男' : '女') : notSetText
			},
			{
				name: '个性签名',
				value: userstatus.signature ? userstatus.signature : notSetText
			}
		]

		return (
			<div className='person-information-container'>
				<div className='title'>
					<span>个人信息</span>
					{
						isOwn?(
							<a className='edit-info' onClick={this.showModal}>
								<CustomIcon type='pen' />
								编辑
							</a>
						):null
					}
				
				</div>
				<div>
					<Modal
						title='编辑个人信息'
						visible={visible}
						onOk={this.handleOk.bind(this)}
						cancelText='取消'
						okText='确定'
						confirmLoading={confirmLoading}
						onCancel={this.handleCancel}
					>
						<Input
							placeholder='昵称'
							size='large'
							defaultValue='1'
							value={username}
							style={{ marginBottom: 20 }}
							onChange={this.handleChange.bind(this, 'username')}
						/>
						<Input
							placeholder='职位'
							size='large'
							value={job}
							style={{ marginBottom: 20 }}
							onChange={this.handleChange.bind(this, 'job')}
						/>
						<Input
							placeholder='城市'
							size='large'
							value={city}
							style={{ marginBottom: 20 }}
							onChange={this.handleChange.bind(this, 'city')}
						/>
						<RadioGroup value={sex} style={{ marginBottom: 20 }} onChange={this.handleChange.bind(this, 'sex')}>
							<Radio value={1}>男</Radio>
							<Radio value={0}>女</Radio>
						</RadioGroup>
						<TextArea
							rows={4}
							value={signature}
							placeholder='个性签名'
							onChange={this.handleChange.bind(this, 'signature')}
						/>
					</Modal>
				</div>
				<div className='info-wapper'>
					{information.map((v) => {
						return (
							<div className='info-box' key={v.name}>
								<label htmlFor=''>{v.name}</label>
								<div className='content'>{v.value}</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
export default PersonCenterInformation
