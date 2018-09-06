import React, { Component } from 'react'
import './sendEmail.scss'
export default class SendEmail extends Component {
  render() {
    let {email,inputFocus,inputBlur,registerSendEamil,isSec,captcha,goToNextRegister} = this.props
    return (
      <div className="send-email-contanier">
        <div className="f_row">
          <label>邮箱</label>
          <input type="text"
            className="input-field"
            value={email}
            onFocus={inputFocus}
            onBlur={inputBlur}
            onChange={this.props.handleChange.bind(this, 'email')}
          />
          <a onClick={registerSendEamil} className="sendEmail" >{isSec?'邮件已经发送':'发送邮件'}</a>
          <u></u>
        </div>
        <div className="f_row">
          <label>验证码</label>
          <input type="text" className="input-field" value={captcha} onFocus={inputFocus} onBlur={inputBlur} onChange={this.props.handleChange.bind(this, 'captcha')} />
          <u></u>
        </div>
        <button type="button" className="btn-large" onClick={goToNextRegister}>继续</button>
      </div>
    )
  }
}
