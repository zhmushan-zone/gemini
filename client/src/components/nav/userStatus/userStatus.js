import React from 'react'

import './userStatus.scss'

class UserStatus extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            isLogin: true
        }
    }
    render () {
        return (
            <div className="userStatus">
                {
                    this.state.isLogin ? 
                    <a href="#javascript" className="nav-user-avator">
                        <img src="" alt=""/>
                    </a>
                    : 
                    <React.Fragment>
                        <a href="#javascript" className="nav-login-btn">登录</a>
                        /
                        <a href="#javascript" className="nav-register-btn">注册</a>
                    </React.Fragment>
                }
            </div>    
        )
    }
}

export default UserStatus