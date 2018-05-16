import React from 'react'
import UserStatus from './userStatus/userStatus'
import {withRouter} from 'react-router-dom'
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
    const navList = ['首页', '在线学习', '讨论区', '看法']
    const navSections = navList.map((section, index) => {
        if (index === this.state.selected) {
          return (
            <li key={index}>
              <a className={is?'':'selected'} style={is?{'color':'white'}:null}   href="#javascript" onClick={(e) => this.navSectionClick(e)} data-identify={index}>{section}</a>
            </li>
          )
        } else {
          return (
            <li key={index}>
              <a href="#javascript" style={is?{'color':'white'}:null}  onClick={(e) => this.navSectionClick(e)} data-identify={index}>{section}</a>
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
            is?null:<span className={`navActiveBG ${personCenterNavBgColor}`}></span>
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
