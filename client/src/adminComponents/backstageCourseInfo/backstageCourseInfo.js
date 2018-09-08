import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import './backstageCourseInfo.scss'

@withRouter
class BackstageCourseInfo extends Component {
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
  render() {
    return (
      <div className="backstage-course-info">
       <div className="uploadVideo-container">
          <h2>uploadVideo</h2>
          <video src={''}></video>
          <label htmlFor="upload-video" onClick={this.uploadVideo.bind(this)}>上传</label>
          <input type="file" name="" id="upload-video" multiple />
      </div>
      </div>
    )
  }
}

export default BackstageCourseInfo