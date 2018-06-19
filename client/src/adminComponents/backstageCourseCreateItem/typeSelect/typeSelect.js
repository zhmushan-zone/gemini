import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option

class TypeSelect extends Component {

  handleChange(value) {
    console.log(value)
    const types = value.map(item => {
      return type2.indexOf(item)
    })
    this.props.typeChange('type', types)
  }

  render() {
    const types = this.props.type.map(item => {
      return type2[item]
    })
    let children = []
    if (this.props.direction || this.props.direction === 0) {
      const childrenArr = [...type[this.props.direction]]
      children = childrenArr.map(item => {
        return <Option key={item}>{item}</Option>
      })
    }
    return <Select
      mode="multiple"
      value={types}
      style={{ width: '100%' }}
      placeholder="请选择课程分类"
      onChange={(v) => this.handleChange(v)}
    >
      {children}
  </Select>
  }
}

const type = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

const type2 = type.join().split(',')

export default TypeSelect