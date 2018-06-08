import React, { Component } from 'react'
import BackstageCourseQuery from '../backgstageCourseQuery/backgroundCourseQuery'
import BackstageCourseList from '../backstageCourseList/backgroundCourseList'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

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
        <BackstageCourseQuery stateChange={this.stateChange} direction={direction} type={type} />
        <Button style={{lineHeight: '32px', marginBottom: 16, marginTop: 24}} type="primary">
          <Link to="/admin/course/create">
            <Icon type="plus"></Icon>
            <span>新建</span>
          </Link>
        </Button>
        <BackstageCourseList />
      </div>
    )
  }
}

export default BackstageCourse