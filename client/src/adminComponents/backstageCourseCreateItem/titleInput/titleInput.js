import React, { Component } from 'react'
import { Input } from 'antd'

class TitleInput extends Component {
  render() {
    const { titleChange } = this.props
    return <Input 
            onChange={(e) => titleChange('title', e.target.value)}
            placeholder="请输入课程标题"
          />
  }
}

export default TitleInput