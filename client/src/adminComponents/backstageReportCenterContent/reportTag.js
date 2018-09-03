import React, { Component } from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag

class ReportTag extends Component {
  handleChange = () => {
    const { showType, type } = this.props
    let newShowType = [...showType]
    if (showType.indexOf(type) === -1) {
      newShowType.push(type)
    } else {
      console.log(type !== 0)
      if (type !== 0) {
        newShowType.splice(newShowType.indexOf(type), 1)
      }
    }

    if (newShowType.indexOf(0) !== -1) {
      if (showType.indexOf(0) !== -1) {
        if (newShowType.indexOf(1) === -1 || newShowType.indexOf(2) === -1 || newShowType.indexOf(1) === -1) {
          newShowType.splice(newShowType.indexOf(0), 1)
        } else {
          newShowType = [0, 1, 2, 3]
        }
      } else {
        newShowType = [0, 1, 2, 3]
      }
    } else {
      if (newShowType.indexOf(1) !== -1 && newShowType.indexOf(2) !== -1 && newShowType.indexOf(3) !== -1) {
        newShowType = [0, 1, 2, 3]
      }
    }
    if (newShowType.length !== 0) {
      this.props.stateChange('showType', newShowType)
    }
  }
  
  render() {
    const { showType, type } = this.props
    const isChecked = !(showType.indexOf(type) === -1)
    return <CheckableTag checked={isChecked} onChange={this.handleChange} style={{marginRight: 24, fontSize: 14}}>{this.props.children}</CheckableTag>
  }
}

export default ReportTag