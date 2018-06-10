import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option

class DirectionSelect extends Component {
  handleChange (v) {
    this.props.directionChange('direction', v)
    this.props.directionChange('type', [])
  }
  render() {
    const directionOptions = direction.map(item => {
      return <Option value={item} key={item}>{item}</Option>
    })
    return <Select
      showSearch
      placeholder="请选择"
      optionFilterProp="children"
      onChange={(v) => this.handleChange(v)}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {directionOptions}
    </Select>
  }
}
const direction = ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

export default DirectionSelect