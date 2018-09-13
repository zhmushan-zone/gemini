import React, { Component } from 'react'
import BackstageCourseInfoTop from '../backstageCourseInfoItem/backstageCourseInfoTop/backstageCourseInfoTop'
import BackstageCourseInfoSection from '../backstageCourseInfoItem/backstageCourseInfoSection/backstageCourseInfoSection'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchOneCourse } from '@/redux/actions'
import './backstageCourseInfo.scss'

@connect(
  state => state.courseInfo,
  { fetchOneCourse }
)
class BackstageCourseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  async componentDidMount() {
    await this.props.fetchOneCourse(this.props.match.params.id)
    this.setState({
      loading: true
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
          </React.Fragment>
          : null
        }
      </div>
    )
  }
}

export default BackstageCourseInfo