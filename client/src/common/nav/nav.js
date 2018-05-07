import React from 'react'

import './nav.scss'

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0
    }
  }
  navSectionClick (e) {
    const navActiveBG = document.querySelector('.navActiveBG')
    const target = e.target

    this.setState({
      selected: parseInt(target.getAttribute('data-identify'), 10)
    })

    const dataIdentify = target.getAttribute('data-identify')
    target.className += 'selected'
    navActiveBG.style.transform = `translateX(${dataIdentify}00%)`

  }

  render() {
    const navList = ['导航', '导航2', '导航3', '导航4', '导航5']
    const navSections = navList.map((section, index) => {
        if (index === this.state.selected) {
          return (
            <li key={index}>
              <a className="selected" href="#javascript" onClick={(e) => this.navSectionClick(e)} data-identify={index}>{section}</a>
            </li>
          )
        } else {
          return (
            <li key={index}>
              <a href="#javascript" onClick={(e) => this.navSectionClick(e)} data-identify={index}>{section}</a>
            </li>
          )
        }
    })
    return (
      <nav>
        <div className="nav-sections">
          <ul>
            {navSections}
          </ul>
          <span className="navActiveBG"></span>
        </div>
      </nav>
    )
  }
}

export default Nav
