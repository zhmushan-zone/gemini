import React, { Component } from 'react'
import BackstageCourseInfoTop from '../backstageCourseInfoItem/backstageCourseInfoTop/backstageCourseInfoTop'
import BackstageCourseInfoSection from '../backstageCourseInfoItem/backstageCourseInfoSection/backstageCourseInfoSection'
import { Icon, Modal, message, Input } from 'antd'
import { connect } from 'react-redux'
import { fetchOneCourse, updateCourse } from '@/redux/actions'
import './backstageCourseInfo.scss'

const confirm = Modal.confirm

@connect(
  state => state.courseInfo,
  { fetchOneCourse, updateCourse }
)
class BackstageCourseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      newSection: ''
    }
  }
  
  async componentDidMount() {
    await this.props.fetchOneCourse(this.props.match.params.id)
    this.setState({
      loading: true
    })
  }
  
  addSection = () => {
    const oldCourse = this.props.data
    confirm({
      title: '您是否想添加章节',
      content: <Input onChange={(e) => this.setState({newSection: e.target.value})} placeholder="请输入章节名称" />,
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          if (!this.state.newSection) {
            reject('请输入章节标题')
          } else {
          const newCourse = {}
          const newSections = [...oldCourse.sections]
          newSections.push({title: this.state.newSection, nodes:[]})
            newCourse.id = oldCourse.id
            newCourse.title = oldCourse.title
            newCourse.coverImg = oldCourse.coverImg
            newCourse.desc = oldCourse.desc
            newCourse.direction = oldCourse.direction
            newCourse.type = oldCourse.type
            newCourse.difficulty = oldCourse.difficulty
            newCourse.price = oldCourse.price
            newCourse.sections = newSections
            await this.props.updateCourse(oldCourse.id, newCourse)
            resolve('添加成功')
          }
        }).then((res) => {
          message.success(res)
        }).catch((rej) => {
          message.warning(rej)
        })
      },
      onCancel() {},
    })
    this.setState({
      newSection: ''
    })
  }
  
  render() {
    return (
      <div className="backstage-course-info">
        {
          this.state.loading ? 
          <React.Fragment>
            <BackstageCourseInfoTop course={this.props.data} />
            <div className="backstage-course-info-desc">
              <div className="backstage-course-info-desc-title">
                课程介绍
              </div>
              <div className="backstage-course-info-desc-content">
                {this.props.data.desc}
              </div>
            </div>
            {
              this.props.data.sections.map((item, index) => {
                return <BackstageCourseInfoSection 
                        course={this.props.data}
                        section={item}
                        sectionNum={index} 
                        key={index}
                      />
              })
            }
            <a className="backstage-course-add-section-btn" onClick={this.addSection}>
              <Icon type="plus" theme="outlined" />添加章节
            </a>
          </React.Fragment>
          : null
        }
      </div>
    )
  }
}

export default BackstageCourseInfo