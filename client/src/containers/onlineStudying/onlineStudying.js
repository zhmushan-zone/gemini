import React, { Component } from 'react'
import OnlineStudyingMenu from '@/components/onlineStudyingMenu/onlineStudyingMenu'

import './onlineStudying.scss'

class OnlineStudying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部'
    }
    this.tabChange = this.tabChange.bind(this)
  }
  
  tabChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const { direction, type } = this.state 
    return (
      <div className="online-studying">
        <OnlineStudyingMenu 
          direction={direction}
          type={type}
          tabChange={this.tabChange}
        />
        <div className="online-studying-courses">
          
        </div>
      </div>
    )
  }
}

export default OnlineStudying