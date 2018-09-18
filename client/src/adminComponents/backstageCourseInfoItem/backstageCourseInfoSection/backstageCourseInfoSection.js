import React, { Component } from 'react'
import SubSection from '../backstageCourseInfoSubSection/backstageCourseInfoSubSection'
import { Icon, message, Modal, Input } from 'antd'
import { connect } from 'react-redux'
import { updateCourse } from '@/redux/actions'

import './backstageCourseInfoSection.scss'

const confirm = Modal.confirm

@connect(
  state => state.courseInfo,
  { updateCourse }
)
class BackstageCourseInfoSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newSubSection: ''
    }
  }
  
  addSubSection = () => {
    const oldCourse = this.props.course
    console.log(this.props.course)
    const sectionNum = this.props.sectionNum
    confirm({
      title: '您是否想为该章节添加小节？',
      content: <Input onChange={(e) => this.setState({newSubSection: e.target.value})} placeholder="请输入小节名称" />,
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          if (!this.state.newSubSection) {
            reject('请输入小节标题')
          } else {
          const newCourse = {}
          const newSections = [...oldCourse.sections]
          newSections[sectionNum].nodes.push({title: this.state.newSubSection, video: 'empty'})
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
      newSubSection: ''
    })
  }

  render() {
    return (
      <div className="backstage-course-info-section">
        <div className="backstage-course-info-section-name">第{this.props.sectionNum + 1}章:{this.props.section.title}</div>
        <div className="backstage-course-info-section-content">
          <a className="backstage-course-add-subSection" onClick={this.addSubSection}>
            <Icon type="plus" theme="outlined" />添加小节
          </a>
          {
            this.props.section.nodes.length ?
            <SubSection 
              course={this.props.course}
              subSection={this.props.section.nodes} 
              sectionNum={this.props.sectionNum}
            /> : null
          }
        </div>
      </div>
    )
  }
}

export default BackstageCourseInfoSection