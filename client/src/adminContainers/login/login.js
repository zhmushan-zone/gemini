import React from 'react'
import { Input, Button, Icon, Alert } from 'antd'
import { login } from '@/redux/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './login.scss'

@connect(
  state => state.userstatus,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }

  handleLogin() {
    this.props.login(this.state.user, this.state.pwd)
  }

  render() {
    return (
      <React.Fragment>

        {this.props.redirectTo ? <Redirect to={'/admin'} /> : null}
        <div className="login">
          <h3>管理员登录</h3>
          <Input
            placeholder="用户名"
            size="large"
            style={{ marginBottom: 30 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => this.handleChange('user', e)}
          />
          <Input
            type="password"
            placeholder="密码"
            size="large"
            style={{ marginBottom: 30 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => this.handleChange('pwd', e)}
          />
          <Button style={{ width: '100%' }} type="primary" onClick={this.handleLogin}>登录</Button>
        </div>
        {
          this.props.msg ?
            <Alert
              style={{ width: 340, margin: '40px auto 0' }}
              message="Error"
              description={this.props.msg}
              type="error"
              showIcon
            />
            :
            null
        }
      </React.Fragment>
    )
  }
}

export default Login