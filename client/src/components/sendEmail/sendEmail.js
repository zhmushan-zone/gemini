import React, { Component } from 'react'

export default class SendEmail extends Component {
  render() {
    return (
      <div>
        <div className="f_row">
          <label>邮箱</label>
          <input type="text" className="input-field" value={this.props.re_username} onFocus={this.props.inputFocus} onBlur={this.props.inputBlur} onChange={this.props.handleChange.bind(this,'re_username')} />
          <u></u>
        </div>
        <button type="button" className="btn-large" onClick={this.props.registerSendEamil}> 发送邮件</button>
      </div>
    )
  }
}
