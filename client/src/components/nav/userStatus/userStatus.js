import React from 'react'
import userAvator from '@/assets/imgs/user-avator.jpg'
import CustomIcon from '@/common/customIcon/customIcon'
import { connect } from 'react-redux'
import { logout } from '@/redux/actions'
import Cookies from 'js-cookie'

import './userStatus.scss'
@connect(
  state => state.userstatus,
  { logout }
)

class UserStatus extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      isLogin: Cookies.get('_id')?true:false,
      isUserInfoShow: false
    }
  }
  //  鼠标移到头像显示用户板块
  toggleHover () {
    if (this.state.isLogin) {
      this.setState({
        isUserInfoShow: !this.state.isUserInfoShow
      })
    }
  }
  // 注销用户的登录状态
  logout () {
    this.setState({
      isLogin: false,
      isUserInfoShow: false
    })
    this.props.logout()
  }

  render () {

    const { username } = this.props
    const linkStyle = this.state.isUserInfoShow ? {border: '2px solid #f01414'} : {border: 'none'}
    return (
      <div className="userStatus"
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}>
        {
          this.state.isLogin ?
          <React.Fragment>
            <a href="#javascript" className="nav-user-avator">
              <img style={linkStyle} src={userAvator} alt="user-avator"/>
            </a>
            {
              this.state.isUserInfoShow ?
                <div className="user-info-wrapper">
                <div className="user-info-top">
                  <a href="#javascript">
                    <img src={userAvator} alt="user-avator"/>
                  </a>
                  <div className="user-info-data">
                    <div className="user-info-name">
                      <a href="#javascript">
                        {username}
                      </a>
                    </div>
                    <div className="user-info-assets">
                      <a href="#javascript">
                        <span className="user-info-experience">经验868</span>
                      </a>
                      <a href="#javascript">
                        <span className="user-info-integral">积分0</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="user-info-center">
                  <ul>
                    <li>
                      <a href="#javascript">我是链接</a>
                    </li>
                    <li>
                      <a href="#javascript">我是链接</a>
                    </li>
                    <li>
                      <a href="#javascript">我是链接</a>
                    </li>
                    <li>
                      <a href="#javascript">我是链接</a>
                    </li>
                  </ul>
                </div>
                <div className="user-info-history">
                  <CustomIcon className="user-info-icon-shizhong" type="shizhong" />
                  <div className="user-info-history-title">React是世界上最好的框架</div>
                  <div className="user-info-history-section">1-1 初识React</div>
                  <a className="user-info-history-continue" href="#javascript">继续</a>
                </div>
                <div className="user-info-logout">
                  <a className="user-info-logout-btn" href="#javascript" onClick={() => this.logout()}>安全退出</a>
                </div>
              </div> : ""
            }
          </React.Fragment>
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
