import React, { Component } from 'react'
import SubSection from '../backstageCourseInfoSubSection/backstageCourseInfoSubSection'

import './backstageCourseInfoSection.scss'

class BackstageCourseInfoSection extends Component {
  render() {
    return (
      <div className="backstage-course-info-section">
        <div className="backstage-course-info-section-name">第{this.props.sectionNum + 1}章:{this.props.section.title}</div>
        <div className="backstage-course-info-section-content">
          {
            this.props.section.nodes.length ?
            <SubSection 
              course={this.props.course}
              subSection={this.props.section.nodes} 
              sectionNum={this.props.sectionNum}
            /> :
            null
          }
        </div>
      </div>
    )
  }
}

export default BackstageCourseInfoSection