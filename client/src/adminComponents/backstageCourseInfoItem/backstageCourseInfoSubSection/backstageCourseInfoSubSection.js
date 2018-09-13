import React, { Component } from 'react'
import { List, Icon } from 'antd'

import './backstageCourseInfoSubSection.scss'

class BackstageCourseInfoSubSection extends Component {
  render() {
    return (
      <div className="backstage-course-info-subSection">
        <List
          header={<div>小节</div>}
          footer={<a className="backstage-course-add-subSection"><Icon type="plus" theme="outlined" />添加小节</a> }
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </div>
    )
  }
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

export default BackstageCourseInfoSubSection