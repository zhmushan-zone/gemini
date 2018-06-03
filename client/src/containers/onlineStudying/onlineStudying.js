import React, { Component } from 'react'
import OnlineStudyingMenu from '@/components/onlineStudyingMenu/onlineStudyingMenu'
import OnlineStudyingOperation from '@/components/onlineStudyingOperation/onlineStudyingOperation'

import './onlineStudying.scss'

class OnlineStudying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部',
      newOrHot: '最新',
      difficulty: '全部',
      isHideAttenedCourse: false
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const { direction, type, newOrHot, difficulty } = this.state 

    return (
      <div className="online-studying">
        <OnlineStudyingMenu 
          direction={direction}
          type={type}
          tabChange={this.stateChange}
        />
        <div className="online-studying-courses">
          <OnlineStudyingOperation 
            newOrHot={newOrHot}
            difficulty={difficulty}
            operationChange={this.stateChange}
          />
        </div>
      </div>
    )
  }
}

export default OnlineStudying