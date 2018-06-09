import React, { Component } from 'react'
import { Upload, message, Icon } from 'antd'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class coverUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      imageUrl: ''
    }
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))
      this.props.stateChange('coverImg', this.state.imageUrl)
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="//jsonplaceholder.typicode.com/posts/"
      beforeUpload={beforeUpload}
      onChange={this.handleChange}
    >
      {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
    </Upload>
  }
}

export default coverUpload