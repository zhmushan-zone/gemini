import React, { Component } from 'react'

export default class Register extends Component {
  render() {
    return (
      <div className="register-container"> 
        <div className="f_row ">
          <label> 用户名</label>
          <input type="text" className="input-field" 
          value={this.props.re_username} onFocus={this.props.inputFocus} 
          onBlur={this.props.inputBlur} onChange={this.props.handleChange.bind(this, 're_username')} />
          <u></u>
        </div>
        <div className="f_row last">
          <label>密码</label>
          <input type="password" 
          className="input-field" 
          value={this.props.re_password} 
          onFocus={this.props.inputFocus} 
          onBlur={this.props.inputBlur} 
          onChange={this.props.handleChange.bind(this, 're_password')} />
          <u></u>
        </div>
        <button type="button" 
        className="btn-large" 
        onClick={this.props.register}> NEXT</button>
      </div>
    )
  }
}
