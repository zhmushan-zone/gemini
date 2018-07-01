import React, { Component } from 'react'
import { Icon } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'

import './coverUpload.scss'

class coverUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgUrl: ''
    }
  }
  
  componentDidMount() {
    const coverUploadInput = document.getElementById('cover-upload')
    coverUploadInput.addEventListener('change', () => {
      const coverImg = coverUploadInput.files[0]
      this.props.coverChange('coverImg', coverImg)
      const reader = new FileReader()
      reader.readAsDataURL(coverImg)
      reader.onload = (e) => {
        const txt = e.target.result
        this.setState({
          imgUrl: txt
        })
      }
      const bodyFormData = new FormData()
      bodyFormData.set('coverImg', coverImg)
      axios({
        method: 'post',
        url: '/api/files/cover-img',
        data: bodyFormData,
        headers: {
          "token": Cookies.get('_token')
        }
      }).then(res => {
        this.props.coverChange('coverImg', res.data.data)
      })
    })
  }
  
  render() {
    return (
      <div className="cover-upload-wrapper">
        {
          this.state.imgUrl ? 
          <img src={this.state.imgUrl} alt=""/>
          : 
          <div className="cover-upload-label">
            <Icon style={{fontSize: 32, color:'#999'}} type="plus" />
            <span style={{color: '#999', textAlign: 'center'}}>上传封面</span>
          </div>
        }
        <input id="cover-upload" type="file"/>
      </div>
    )
  }
}

export default coverUpload