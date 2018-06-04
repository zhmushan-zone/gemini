import React from 'react'
import { Icon, Avatar } from 'antd'
import { connect } from 'react-redux'
import './backstageTop.scss'
@connect(
  state => state.userstatus,
)
class BackstageTop extends React.Component {
  render () {
    return (
      <div className="backstage-top">
        <button className="menu-btn" onClick={this.props.toggleCollapsed}>
          <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </button>
        <span className="admin-avatar" href="#javascript">
          <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="small">
            Admin
          </Avatar>
          <span className="admin-name">
            {this.props.username?this.props.username:'我是帅逼'}
          </span>
        </span>
      </div>
    )
  }
}

export default BackstageTop