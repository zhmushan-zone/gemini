import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option

class DifficultyInput extends Component {
  handleChange (v) {
    this.props.difficultyChange('difficulty', difficulty.indexOf(v))
  }
  render() {
    const difficultyOptions = difficulty.map(item => {
      return <Option value={item} key={item}>{item}</Option>
    })
    return <Select
      showSearch
      placeholder="请选择"
      optionFilterProp="children"
      onChange={(v) => this.handleChange(v)}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {difficultyOptions}
    </Select>
  }
}

const difficulty = [
  '基础',
  '中级',
  '进阶'
]

export default DifficultyInput