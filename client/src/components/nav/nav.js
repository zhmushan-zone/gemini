import React from 'react'
import UserStatus from './userStatus/userStatus'
import {withRouter, NavLink} from 'react-router-dom'
import classnames from 'classnames'

import './nav.scss'
@withRouter
class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  componentDidMount () {
    const { pathname } = this.props.location
    if (pathname === '/onlineStudying') {
      this.setState({
        selected: 1
      })
    } else if (pathname === '/forum') {
      this.setState({
        selected: 2
      })
    } else if (pathname === '/opinion') {
      this.setState({
        selected: 3
      })
    }
  }

  navSectionClick (e) {
    const navActiveBG = document.querySelector('.navActiveBG')
    if(navActiveBG){
      const target = e.target

      this.setState({
        selected: parseInt(target.getAttribute('data-identify'), 10)
      })

      const dataIdentify = target.getAttribute('data-identify')
      navActiveBG.style.transform = `translateX(${dataIdentify}00%)`
    }
  }

  render() {
    var is = this.props.location.pathname.split('/')[1]==='personCenter'
    const personCenterNavBgColor=classnames({
      'personCenterNavBgColor':is
    })
    const navList = ['首页', '在线学习', '答疑', '看法']
    const navRoute = ['/home', '/onlineStudying', '/forum', '/opinion']
    const navSections = navList.map((section, index) => {
        if (index === this.state.selected) {
          return (
            <li key={index}>
              <NavLink className={is?'':'selected'} style={is?{'color':'white'}:null} to={navRoute[index]} onClick={(e) => this.navSectionClick(e)} data-identify={index}>{section}</NavLink>
            </li>
          )
        } else {
          return (
            <li key={index}>
              <NavLink to={navRoute[index]} style={is?{'color':'white'}:null}  onClick={(e) => this.navSectionClick(e)} data-identify={index}>{section}</NavLink>
            </li>
          )
        }
    })
    return (
      <nav style={is?{'boxShadow':'none'}:null}>
        <div className="nav-sections">
          <ul>
            {navSections}
          </ul>
          {
            is?null:<span style={{transform: `translateX(${this.state.selected}00%)`}} className={`navActiveBG ${personCenterNavBgColor}`}></span>
          }
        </div>
        {
          !is?<UserStatus />:null
        }
      </nav>
    )
  }
}

export default Nav
