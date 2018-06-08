import React, { Component } from 'react'
import BackgroundCourseQuery from '../backgroundCourseQuery/backgroundCourseQuery'
import BackgroundCourseList from '../backgroundCourseList/backgroundCourseList'
import { Button, Icon } from 'antd'

import './backstageCourse.scss'

class BackstageCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部'
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  stateChange (value, key) {
    this.setState({
      [key]: value
    })
  }
  render() {
    const { direction, type } = this.state
    return (
      <div className="backstage-course">
        <BackgroundCourseQuery stateChange={this.stateChange} direction={direction} type={type} />
        <Button style={{lineHeight: '32px', marginBottom: 16, marginTop: 24}} type="primary">
          <Icon type="plus"></Icon>
          <span>新建</span>
        </Button>
        <BackgroundCourseList />
      </div>
    )
  }
}

export default BackstageCourse