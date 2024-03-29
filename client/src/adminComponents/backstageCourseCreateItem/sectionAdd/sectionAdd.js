import React, { Component } from 'react'
import { Select, Input } from 'antd'

import './sectionAdd.scss'

const Option = Select.Option

class SectionAdd extends Component {
  selectChange (v) {
    const sections = []
    for (let i = 1; i <= v; i++) {
      sections.push({
        key: i,
        title: '',
        nodes: []
      })
    }
    this.props.sectionChange('sections', sections)
  }
  render() {
    const sectionOptions = []
    for (let i = 1; i <= 30; i++) {
      sectionOptions.push(
        <Option value={i} key={i}>{`${i}章`}</Option>
      )
    }
    let sectionInputs
    if (this.props.sections) {
      sectionInputs = this.props.sections.map(item => {
        const sections = [...this.props.sections]
        const key = Object.keys(item)[1]
        return <Input
          style={{marginTop: 10}}
          prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>{item.key}</span>}
          placeholder={`请输入标题`}
          onChange={(e) => {
            sections[item.key - 1][key] = e.target.value
            this.props.sectionChange('sections', sections)
          }}
          key={item.key}
        />
      })
    }
    return (
      <React.Fragment>
        <Select
          showSearch
          placeholder="请选择"
          optionFilterProp="children"
          onChange={(v) => this.selectChange(v)}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {sectionOptions}
        </Select>
        {sectionInputs}
      </React.Fragment>
    )
  }
}

export default SectionAdd