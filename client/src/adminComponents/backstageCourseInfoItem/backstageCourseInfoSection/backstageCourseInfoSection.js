import React, { Component } from 'react'

import './backstageCourseInfoSection.scss'

class BackstageCourseInfoSection extends Component {
  render() {
    return (
      <div className="backstage-course-info-section">
        <div className="backstage-course-info-section-name">第{this.props.sectionNum}章:{this.props.section.title}</div>
        <div className="backstage-course-info-section-content">
          
        </div>
      </div>
    )
  }
}

export default BackstageCourseInfoSection