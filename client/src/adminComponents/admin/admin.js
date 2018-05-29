import React, { Component } from 'react'
import BackstageMenu from '../backstageMenu/backstageMenu'
import BackstageTop from '../backstageTop/backstageTop'

import './admin.scss'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
      <div className="admin">
        <BackstageMenu collapsed={this.state.collapsed} />
        <div className="backstage-content">
          <BackstageTop collapsed={this.state.collapsed} toggleCollapsed={this.toggleCollapsed} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Admin