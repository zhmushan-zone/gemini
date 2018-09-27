import React, { Component } from 'react'
import { connect } from 'react-redux'
import { countDown } from '@/redux/actions'
import './sendEmail.scss'

@connect(
	state => state.countDown,
	{ countDown }
)
export default class SendEmail extends Component {
	timeToZero = () => {
		let num = 60
		const timer = setInterval(() => {
			if (num === -1) {
				clearInterval(timer)
				this.props.countDown(60)
				this.props.isToZero()
			}
			const newTime = num--
			this.props.countDown(newTime)
		}, 1000)
	}
	
	componentWillReceiveProps(nextProps) {
		if (!this.props.isSec && nextProps.isSec) {
			this.timeToZero()
		}
	}
	
	render() {
		let { email, inputFocus, inputBlur, registerSendEamil, isSec, captcha, goToNextRegister } = this.props
		return (
			<div className='send-email-contanier'>
				<div className='f_row'>
					<label>邮箱</label>
					<input
						type='text'
						className='input-field'
						value={email}
						onFocus={inputFocus}
						onBlur={inputBlur}
						onChange={this.props.handleChange.bind(this, 'email')}
					/>
					<a onClick={registerSendEamil} className={`sendEmail ${isSec ? 'noclick' : ''}`}>
						{isSec ? `${this.props.count}s可重新发送` : '发送邮件'}
					</a>
					<u />
				</div>
				<div className='f_row'>
					<label>验证码</label>
					<input
						type='text'
						className='input-field'
						value={captcha}
						onFocus={inputFocus}
						onBlur={inputBlur}
						onChange={this.props.handleChange.bind(this, 'captcha')}
					/>
					<u />
				</div>
				<button type='button' className='btn-large' onClick={goToNextRegister}>
					继续
				</button>
			</div>
		)
	}
}
