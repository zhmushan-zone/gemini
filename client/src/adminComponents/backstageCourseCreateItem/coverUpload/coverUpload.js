import React, { Component } from 'react'
import { Icon } from 'antd'
import './coverUpload.scss'

class coverUpload extends Component {
  componentDidMount() {
    const coverUploadInput = document.getElementById('cover-upload')
    coverUploadInput.addEventListener('change', () => {
      const cover = coverUploadInput.files[0]
      var bodyFormData = new FormData()
      bodyFormData.set('cover', cover)
      var reader = new FileReader()
      reader.readAsDataURL(cover)
      reader.onload = (e) => {
        var txt = e.target.result
        this.props.coverChange('coverImg', txt)
      }
    })
  }
  
  render() {
    return (
      <div className="cover-upload-wrapper">
        {
          this.props.coverImg ? 
          <img src={this.props.coverImg} alt=""/>
          : null
        }
        <input id="cover-upload" type="file"/>
      </div>
    )
  }
}

export default coverUpload