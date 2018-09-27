import React, { Component } from 'react'
import { Switch } from 'antd'

import './onlineStudyingOperation.scss'

class OnlineStudyingOperation extends Component {
  getOperationTab (operationTabArr, operationState, operationStateName) {
    return operationTabArr.map((item, index) => {
      return <a href="#javascript"
                onClick={() => this.props.operationChange(operationStateName, item)}
                style={operationState === item ? {color: '#f01414'} : null}
                key={index}
              >{item}</a>
    })
  }

  switchClick (isHide) {
    this.props.operationChange('isHideAttenedCourse', isHide)
  }

  render() {
    const { newOrHot, difficulty } = this.props
    const newOrHotArr = ['最新', '最热']
    const newOrHotItems = this.getOperationTab(newOrHotArr, newOrHot, 'newOrHot')
    const difficultyArr = ['全部', '基础', '中级', '进阶']
    const difficultyItems = this.getOperationTab(difficultyArr, difficulty, 'difficulty')
    return (
      <div className="online-studying-courses-operation">
        <div className="new-or-hot">
          {newOrHotItems}
        </div>
        <div className="courses-operation-right">
          <div className="online-studying-courses-difficulty">
            {difficultyItems}
          </div>
          <div className="is-hide-attened-course">
            <Switch className="hide-attened-switch" onChange={(isHide) => this.switchClick(isHide)}/>
            <label>隐藏已参加课程</label>
          </div>
        </div>
      </div>
    )
  }
}

export default OnlineStudyingOperation