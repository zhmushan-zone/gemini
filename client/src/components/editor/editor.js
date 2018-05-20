import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'
import './editor.scss'
class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: ''
    }
  }
  handleChange(value) {
    this.setState({
      textValue: value
    })
  }

  render() {
    return (
      <div className="editorContainer">
        <SimpleMDE
          onChange={this.handleChange.bind(this)}
          value={this.state.textValue}
        />
      </div>
    )
  }
}
export default Editor
