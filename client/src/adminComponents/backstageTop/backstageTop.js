import React from 'react'
import { Icon, Avatar } from 'antd'

import './backstageTop.scss'

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
            LiZhiHao
          </span>
        </span>
      </div>
    )
  }
}

export default BackstageTop