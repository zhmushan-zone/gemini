import React, { Component } from 'react'
import OnlineStudyingMenu from '@/components/onlineStudyingMenu/onlineStudyingMenu'
import OnlineStudyingOperation from '@/components/onlineStudyingOperation/onlineStudyingOperation'
import CoursePreview from '@/common/coursePreview/coursePreview'
import { Pagination, Col } from 'antd'
import { connect } from 'react-redux'
import { getCourseList } from '@/redux/actions'
import { dateSortByCreate } from '@/util/dateSort'
import Loading from '@/common/loading/loading'

import './onlineStudying.scss'

@connect(
  state => state.course,
  { getCourseList }
)
class OnlineStudying extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: '全部',
      type: '全部',
      newOrHot: '最新',
      difficulty: '全部',
      isHideAttenedCourse: false,
      loading: true
    }
    this.stateChange = this.stateChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getCourseList()
    this.setState({
      loading: false
    })
  }
  
  
  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const selectDirection = allDirection.indexOf(this.state.direction)
    const selectType = allType2.indexOf(this.state.type)
    const selectDifficulty = allDifficulties.indexOf(this.state.difficulty)
    const selectNewOrHot = allNewOrHot.indexOf(this.state.newOrHot)
    let courses = [...this.props.courses]
    if (courses.length) {
      if (selectNewOrHot) {
        courses.sort((a, b) => b.joinersId.length - a.joinersId.length)
      } else {
        dateSortByCreate(courses)
      }
      if (selectDirection) {
        courses = courses.filter(item => item.direction + 1 === selectDirection)
      }
      if (selectType !== -1) {
        console.log(selectType)
        console.log(courses)
        courses = courses.filter(item => item.type.includes(selectType))
      }
      if (selectDifficulty !== -1) {
        courses = courses.filter(item => item.difficulty === selectDifficulty)
      }
    }
    const { direction, type, newOrHot, difficulty } = this.state
    return (
      <div className="online-studying">
        <OnlineStudyingMenu
          direction={direction}
          type={type}
          tabChange={this.stateChange}
        />
        <div className="online-studying-courses">
          <OnlineStudyingOperation
            newOrHot={newOrHot}
            difficulty={difficulty}
            operationChange={this.stateChange}
          />
          <div className="online-studying-courses-wrapper">
            {
              this.state.loading ?
              <Loading style={{marginTop: 150}} /> :
              (
                courses.length ?
                <React.Fragment>
                  {
                    courses.map((item, index) => {
                      console.log(item)
                      return <CoursePreview
                        courseId={item.id}
                        name={item.title}
                        level={item.difficulty}
                        viewerCount={item.joinersId.length}
                        rate={item.rate}
                        price={item.price}
                        img={item.coverImg}
                        style={{margin: '0 16px', marginBottom: 20}}
                        key={index}
                      />
                    }) 
                  }
                  {
                    courses.length > 12 ?
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <Pagination className="online-studying-courses-pagination" defaultCurrent={1} total={50} />
                    </div> : null
                  }
                </React.Fragment>
                : null
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const allDirection = ['全部', '前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const allType = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

const allDifficulties = ['基础', '中级', '进阶']

const allType2 = allType.join().split(',')

const allNewOrHot = ['最新', '最热']

export default OnlineStudying