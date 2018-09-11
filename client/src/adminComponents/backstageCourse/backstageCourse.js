import React, { Component } from 'react'
import BackstageCourseQuery from '../backgstageCourseQuery/backgroundCourseQuery'
import BackstageCourseList from '../backstageCourseList/backgroundCourseList'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourseList } from '@/redux/actions'

import './backstageCourse.scss'

@connect(
  state => state.course,
  { getCourseList }
)
class BackstageCourse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部'
    }
    this.stateChange = this.stateChange.bind(this)
  }

  componentDidMount() {
    this.props.getCourseList()
  }

  stateChange (value, key) {
    this.setState({
      [key]: value
    })
  }

  filterCourse (courses) {
    const currentDir = direction.indexOf(this.state.direction)
    const currentType = type1.indexOf(this.state.type)
    
    if (currentDir === -1 && currentType === -1) {
      return courses
    } else if (currentDir !== -1 && currentType === -1) {
      return courses.filter(course => course.direction === currentDir)
    } else if (currentDir === -1 && currentType !== -1) {
      return courses.filter(course => course.type.indexOf(currentType) !== -1)
    } else {
      return courses.filter(course => course.direction === currentDir && course.type.indexOf(currentType) !== -1)
    }
  }
  getData (courses) {
    const data = courses.map((item, index) => {
      return {
        courseId: item.id,
        key: index,
        id: index,
        title: item.title,
        difficulty: difficulty[item.difficulty],
        direction: direction[item.direction],
        type: item.type.map(i => {
          return type1[i]
        }).join(',')
      }
    })
    return data
  }

  render() {
    const courses = this.filterCourse(this.props.courses)
    const data = this.getData(courses)
    return (
      <div className="backstage-course">
        <BackstageCourseQuery stateChange={this.stateChange} direction={this.state.direction} type={this.state.type} />
        <Button style={{lineHeight: '32px', marginBottom: 16, marginTop: 24}} type="primary">
          <Link to="/admin/course/create">
            <Icon type="plus"></Icon>
            <span>新建</span>
          </Link>
        </Button>
        {data.length ? <BackstageCourseList data={data}/> : null}
      </div>
    )
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

const type1 = type.join().split(',')

const difficulty = [
  '基础',
  '中级',
  '进阶'
]

export default BackstageCourse