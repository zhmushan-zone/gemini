import React, { Component } from 'react'
import { Row, Col , Select, Button } from 'antd'

class BackstageCourseQuery extends Component {
  directionHandleChange (v) {
    this.props.stateChange(v, 'direction')
    this.props.stateChange('全部', 'type')
  }

  reset() {
    this.props.stateChange('全部', 'direction')
    this.props.stateChange('全部', 'type')
  }

  render() {
    const Option = Select.Option
    const directionOptions = direction.map(item => {
      return <Option value={item} key={item}>{item}</Option>
    })
    let typeOptions
    if (this.props.direction) {
      typeOptions = this.props.direction === '全部' ? 
      type.join().split(',').map(item => {
        return <Option value={item} key={item}>{item}</Option>
      })
      : 
      [...type[direction.indexOf(this.props.direction) - 1]].map(item => {
        return <Option value={item} key={item}>{item}</Option>
      })
    }
    return (
      <Row style={{lineHeight: '32px'}} gutter={40}> 
            <Col style={{display: 'flex'}} span={8}>
              <label style={{paddingRight: 8}} >课程方向:</label>
              <Select dropdownClassName="directionSelect"
                showSearch
                value={this.props.direction}
                optionFilterProp="children"
                style={{flex: 1}}
                onChange={(v) => {this.directionHandleChange(v)}}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {directionOptions}
              </Select>
            </Col>
            <Col style={{display: 'flex'}} span={8}>
              <label style={{paddingRight: 8}} >分类:</label>
              <Select dropdownClassName="typeSelect"
                ref="typeSelect"
                showSearch
                value={this.props.type}
                optionFilterProp="children"
                style={{flex: 1}}
                onChange={(v) => this.props.stateChange(v, 'type')}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="全部">全部</Option>
                {typeOptions}
              </Select>
            </Col>
            <Col  span={8}>
              <Button style={{lineHeight: '32px', marginRight: 10}} type="primary">查询</Button>
              <Button style={{lineHeight: '32px'}} onClick={() => this.reset()}>重置</Button>
            </Col>
          </Row>
    )
  }
}

const direction = ['全部', '前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const type = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

export default BackstageCourseQuery