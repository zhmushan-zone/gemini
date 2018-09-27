import React from 'react'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import './PersonCenterInformation.scss'
import { changePersonMsg } from '@/redux/actions'
import CustomIcon from '@/common/customIcon/customIcon'
import { notSetText } from '@/const'
@connect((state) => state, { changePersonMsg })
class PersonCenterInformation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			confirmLoading: false,
			sex: 0,
			username: '',
			job: '',
			signature: '',
			city: '',
		}
	}
	success = () => {
		message.success('修改成功')
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}
	//点击确认
	async handleOk() {
		this.setState({
			confirmLoading: true,
		})
		let username = this.refs.inputUsername.value
		let job = this.refs.inputJob.value
		let city = this.refs.inputCity.value
		let signature = this.refs.inputSignature.value
		let sex = this.refs.radioSex1.checked ? 0 : 1
		await this.props.changePersonMsg(username, job, city, sex, signature)
		this.props.userstatus.msg === '成功' ? this.success() : null
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			})
		}, 100)
	}
	// 取消修改信息
	handleCancel = () => {
		this.setState({
			visible: false,
		})
	}

	// 表单信息
	handleChange = (key, event) => {
		this.setState({
			[key]: event.target.value,
		})
	}

	render() {
		const { visible, confirmLoading } = this.state
		const { isOwn, User } = this.props

		let information
		information = [
			{
				name: '昵称',
				value: User.nickname,
			},
			{
				name: '职位',
				value: User.job ? User.job : notSetText,
			},
			{
				name: '城市',
				value: User.city ? User.city : notSetText,
			},
			{
				name: '性别',
				value: User.sex,
			},
			{
				name: '个性签名',
				value: User.signature ? User.signature : notSetText,
			},
		]

		return (
			<div className='person-information-container'>
				<div className='title'>
					<span>个人信息</span>
					{isOwn ? (
						<a className='edit-info' onClick={this.showModal}>
							<CustomIcon type='pen' />
							编辑
						</a>
					) : null}
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
						<div className='contentInput'>
							<input
								defaultValue={this.props.User.nickname}
								ref='inputUsername'
								className='nickname'
								id='nickname'
								type='text'
								onChange={(e) => {
									this.setState({
										username: e.target.value,
									})
								}}
							/>

							<input
								placeholder='职位'
								defaultValue={this.props.User.job}
								ref='inputJob'
								type='text'
								style={{ marginBottom: 20 }}
								onChange={this.handleChange.bind(this, 'job')}
							/>
							<input
								placeholder='城市'
								defaultValue={this.props.User.city}
								ref='inputCity'
								type='text'
								style={{ marginBottom: 20 }}
								onChange={this.handleChange.bind(this, 'city')}
							/>

							<div className='radio-container'>
								<div className='radio'>
									<input id='radio-1' name='sex' value='0' ref='radioSex1' type='radio' defaultChecked />
									<label htmlFor='radio-1' className='radio-label'>
										女
									</label>
								</div>
								<div className='radio'>
									<input id='radio-2' name='sex' value='1' ref='radioSex2' type='radio' />
									<label htmlFor='radio-2' className='radio-label'>
										男
									</label>
								</div>
							</div>

							<textarea
								rows={4}
								defaultValue={this.props.User.signature}
								ref='inputSignature'
								className='signature'
								id='signature'
								placeholder='个性签名'
								onChange={this.handleChange.bind(this, 'signature')}
							/>
						</div>
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
