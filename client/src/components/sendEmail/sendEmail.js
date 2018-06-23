import React, { Component } from 'react'
import './sendEmail.scss'
export default class SendEmail extends Component {
  render() {
    return (
      <div className="send-email-contanier">
        <div className="f_row">
          <label>邮箱</label>
          <input type="text"
            className="input-field"
            value={this.props.email}
            onFocus={this.props.inputFocus}
            onBlur={this.props.inputBlur}
            onChange={this.props.handleChange.bind(this, 'email')}
          />
          <a onClick={this.props.registerSendEamil} className="sendEmail" >{this.props.isSec?'邮件已经发送':'发送邮件'}</a>
          <u></u>
        </div>
        <div className="f_row">
          <label>验证码</label>
          <input type="text" className="input-field" value={this.props.captcha} onFocus={this.props.inputFocus} onBlur={this.props.inputBlur} onChange={this.props.handleChange.bind(this, 'captcha')} />
          <u></u>
        </div>
        <button type="button" className="btn-large" onClick={this.props.goToNextRegister}>继续</button>
      </div>
    )
  }
}
