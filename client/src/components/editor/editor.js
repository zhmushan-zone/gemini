import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { Tag, Button } from 'antd'
import EditorHeader from '../editorHeader/editorHeader'
import CustomIcon from '@/common/customIcon/customIcon'
import 'simplemde/dist/simplemde.min.css'
import './editor.scss'
const { CheckableTag } = Tag
class MyTag extends React.Component {
  state = { checked: false };
  handleChange = (checked, e) => {
    this.setState({ checked: !this.state.checked })
    this.props.getnowchecked(checked)
  }
  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: '',
      tag: []
    }
  }
  handleChange(value) {
    this.setState({
      textValue: value
    })
  }
  getChecked(check){
    console.log(check)
  }

  render() {
    const category = ['JavaScript', 'Node.js', 'Vue', 'react', 'angular', 'html', 'css', 'jquery', 'bootstrap', '前端工具', 'sass/less', 'java', 'python', 'go', 'php', 'ruby', 'thinkphp', 'c', 'c++', 'c#', 'spring boot', 'Yli', '算法', '数据库', 'android', 'ios', '大数据', '人工智能', '机器学习', '产品', '设计']
    return (
      <div className="editorContainer">
        <EditorHeader />
        <SimpleMDE
          onChange={this.handleChange.bind(this)}
          value={this.state.textValue}
        />
        {/* 上传封面 */}
        <div className="upload-pic-box">
          <span className="needed">文章封面</span>
          <span className="err-tip"></span>
          <div className="face-upload-box">
            <input type="file" id="fengmian" className="cover" />
            <label htmlFor="fengmian">
              <CustomIcon type="camera-b" size={80}></CustomIcon>
            </label>
            <span className="l pic-tip">封面图规格：<br />尺寸为200*200像素，格式为 PNG/JPG/GIF,小于等于80KB </span>
          </div>
        </div>
        <div className="category">
          <span className="needed">文章分类</span>
          <div>
            {category.map(v => {
              return (
                <MyTag key={v} getnowchecked={check => this.getChecked(check)}>{v}</MyTag>
              )
            })}
          </div>
          <p>
            <Button type="danger" size={"large"} ghost>发表</Button>
          </p>
        </div>
      </div>
    )
  }
}
export default Editor
