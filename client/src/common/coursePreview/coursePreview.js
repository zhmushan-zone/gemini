import React from 'react'
import CustomIcon from '../customIcon/customIcon'
import './coursePreview.scss'

class CoursePreview extends React.Component {
  // 传入评价的值计算应该出现星的数量和类型
  rateJudgment (rate) {
    const star = []
    let i
    for (i = 1; i <= rate; i ++) {
      star.push('complete')
    }
    if (rate - i + 1> 0.3 && rate - i < 0.8) {
      star.push('half')
    } else if (rate - i + 1 >= 0.8) {
      star.push('complete')
    }

    return star
  }

  courseHoverIn (e) {
    const title = e.currentTarget.querySelector('.course-preview-title')
    const cover = e.currentTarget.querySelector('.course-preview-cover')
    title.style.color = '#F01414'
    cover.style.boxShadow = '0 10px 12px rgba(0, 0, 0, .09)'
  }

  courseHoverOut (e) {
    const title = e.currentTarget.querySelector('.course-preview-title')
    const cover = e.currentTarget.querySelector('.course-preview-cover')
    title.style.color = '#07111B'
    cover.style.boxShadow = 'none'
  }

  render () {
    return (
      <div className="course-preview">
        <a href="#javascript" onMouseEnter={(e) => this.courseHoverIn(e)} onMouseLeave={(e) => this.courseHoverOut(e)}>
          <img className="course-preview-cover" src={this.props.img} alt={this.props.name}/>
          <h3 className="course-preview-title">{this.props.name}</h3>
          <div className="course-preview-data">
            <span className="course-preview-difficulty-data">{this.props.level}</span>
            <span className="course-preview-viewer-data">
              <CustomIcon type="yonghu" size={12} />
              {this.props.viewerCount}
            </span>
            <span className="course-preview-rate-data">
              {
                this.rateJudgment(this.props.rate).map((item, index) => {
                  if (item === 'complete') {
                    return <CustomIcon type="star1" color="#f29d39" size={14} key={index} />
                  } else {
                    return <CustomIcon type="star2" color="#f29d39" size={14} key={index} />
                  }
                })
              }
            </span>
          </div>
          <div className="course-preview-price">
              <CustomIcon type="jifen" color="#93999F" />
              <span>{this.props.price}</span>
          </div>
        </a>
      </div>  
    )
  }
}

export default CoursePreview