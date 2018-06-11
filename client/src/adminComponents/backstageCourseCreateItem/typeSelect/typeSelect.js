import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option

class TypeSelect extends Component {

  handleChange(value) {
    this.props.typeChange('type', value)
  }

  render() {
    let children = []
    if (this.props.direction) {
      const childrenArr = [...type[direction.indexOf(this.props.direction)]]
      children = childrenArr.map(item => {
        return <Option key={item}>{item}</Option>
      })
    }
    return <Select
      mode="multiple"
      value={this.props.type}
      style={{ width: '100%' }}
      placeholder="请选择课程分类"
      onChange={(v) => this.handleChange(v)}
    >
      {children}
  </Select>
  }
}

const direction = ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const type = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

export default TypeSelect