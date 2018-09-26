import React, { Component } from 'react'
import './sendEmail.scss'
export default class SendEmail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: 60,
		}
	}
	componentWillUnmount() {
		clearInterval(this.newTimer)
	}

	timeToZero() {
		let { time } = this.state
		this.newTimer = setInterval(() => {
			this.setState({
				time: time - 1,
			})
		}, 1000)
		if (this.state.time <= 0) {
			clearInterval(this.newTimer)
		}
	}
	shouldComponentUpdate = (nextProps, nextState) => {
    if(nextState.time>this.state.time){
      return false
    }
    return true
  }
  
	render() {
		let { email, inputFocus, inputBlur, registerSendEamil, isSec, captcha, goToNextRegister } = this.props
		if (isSec) {
			this.timeToZero()
		}
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
						{isSec ? `${this.state.time}` : '发送邮件'}
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
