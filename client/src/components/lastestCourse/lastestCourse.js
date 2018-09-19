import React from 'react'
import CoursePreview from '@/common/coursePreview/coursePreview'

import './lastestCourse.scss'

class LastestCourse extends React.Component {
  render () {
    return (
      <div className="lastest-course">
        <h3>最新课程</h3>
        <div className="lastest-content">
          {
            this.props.latestCourse.length ?
            this.props.latestCourse.map((item, index) => {
              return <CoursePreview 
                courseId={item.id}
                name={item.title}
                level={item.difficulty}
                viewerCount={item.joinersId.length}
                rate={item.rate}
                price={item.price}
                img={item.coverImg}
                key={index} />
            }) : null
          }
        </div>
      </div>
    )
  }
}

export default LastestCourse
