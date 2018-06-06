import React, { Component } from 'react'
import BackgroundCourseQuery from '../backgroundCourseQuery/backgroundCourseQuery'

import './backstageCourse.scss'

class BackstageCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '',
      type: ''
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  stateChange (value, key) {
    this.setState({
      [key]: value
    })
  }
  render() {
    return (
      <div className="backstage-course">
        <BackgroundCourseQuery stateChange={this.stateChange} direction={this.state.direction} />
      </div>
    )
  }
}

export default BackstageCourse