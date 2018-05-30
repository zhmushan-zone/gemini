import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BackstageMenu from '../backstageMenu/backstageMenu'
import BackstageTop from '../backstageTop/backstageTop'
import Login from '@/adminContainers/login/login'

import './admin.scss'

@withRouter
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
    const { pathname } = this.props.location
    return (
      <React.Fragment>
        {
          pathname === '/admin/login' ? 
          <Login /> :
          <div className="admin">
            <BackstageMenu collapsed={this.state.collapsed} />
            <div className="backstage-content">
              <BackstageTop collapsed={this.state.collapsed} toggleCollapsed={this.toggleCollapsed} />
              {this.props.children}
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default Admin