import React, { Component } from 'react'
import Cookies from 'js-cookie'
import './uploadVideo.scss'
import axios from 'axios'
class UploadVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  uploadVideo() {
    document.getElementById("upload-video").addEventListener("change", function (e) {
      let video = document.getElementById("upload-video").files
      let bodyFormData
      bodyFormData = new FormData()
      for (let index = 0; index < video.length; index++) {
        const videoNow = video[index]
        bodyFormData.set(videoNow.name,videoNow)
        console.log('1')
      }
      axios({
        method: 'post',
        url: '/api/videos',
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          "id": Cookies.get('_id'),
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
      <div className="uploadVideo-container">
        <h2>uploadVideo</h2>
        <video src={''}></video>
        <label htmlFor="upload-video" onClick={this.uploadVideo.bind(this)}>上传</label>
        <input type="file" name="" id="upload-video" multiple />
      </div>
    )
  }
}
export default UploadVideo
