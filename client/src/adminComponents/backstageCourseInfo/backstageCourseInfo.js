import React, { Component } from 'react'
import BackstageCourseInfoTop from '../backstageCourseInfoItem/backstageCourseInfoTop/backstageCourseInfoTop'
import Cookies from 'js-cookie'
import axios from 'axios'

class BackstageCourseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: null
    }
  }
  
  uploadVideo() {
    document.getElementById("upload-video").addEventListener("change", function (e) {
      let video = document.getElementById("upload-video").files
      let bodyFormData
      bodyFormData = new FormData()
      for (let index = 0; index < video.length; index++) {
        const videoNow = video[index]
        bodyFormData.append('video',videoNow)
        console.log('1')
      }
      axios({
        method: 'post',
        url: '/api/videos',
        data: bodyFormData,
        headers: {
          "token": Cookies.get('_token'),
        },
      })
        .then(res => {
          if (res.data.code === 1) {
            console.log(res.data)
          }
        })

    })
  }

  async componentDidMount() {
    const res = await axios({
      method: 'get',
      url: `/api/courses/${this.props.match.params.id}`
    })
    if (res.data.code === 1) {
      this.setState({
        course: res.data.data
      })
    }
  }
  
  render() {
    return (
      <div className="backstage-course-info">
        {
          this.state.course ? 
          <BackstageCourseInfoTop course={this.state.course} /> : null
        }
      </div>
    )
  }
}

export default BackstageCourseInfo