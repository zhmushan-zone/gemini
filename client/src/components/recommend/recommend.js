import React from 'react'

import './recommend.scss'
import CoursePreview from '@/common/coursePreview/coursePreview'

class Recommend extends React.Component {
  
  render () {
    return (
      <div className="recommend">
        <h3>热门课程推荐</h3>
        <div className="recommend-content">
          {
            this.props.hotCourse.length ?
            this.props.hotCourse.map((item, index) => {
              return <CoursePreview name={item.title}
                courseId={item.id}
                level={item.difficulty}
                viewerCount={item.joinersId.length}
                rate={item.rate}
                price={item.price}
                img={item.coverImg}  
                key={index}/>  
            }) : null
          }
        </div>
      </div>
    )
  }
}

export default Recommend