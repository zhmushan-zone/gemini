import React from 'react'
import UserStatus from '../nav/userStatus/userStatus'
import './EditorHeader.scss'
class EditorHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ""
    }
  }
  componentDidMount = () => {
    this.inputText.focus()
  }

  async handleTitle(e) {
    this.setState({
      title: e.target.value
    })
    await this.props.editorHeader(this.state.title)
  }
  render() {
    return (
      <div className="editor-header-container">
        <input type="text" className="title"
          placeholder="请输入您的标题"
          value={this.state.title}
          onChange={this.handleTitle.bind(this)}
          ref={input => { this.inputText = input }}
        />
        <UserStatus />
      </div>
    )
  }
}
export default EditorHeader
