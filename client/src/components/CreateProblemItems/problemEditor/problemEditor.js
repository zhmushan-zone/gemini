import React, { Component } from 'react'
import E from 'wangeditor'

class ProblemEditor extends Component {

  componentDidMount () {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.props.descChange('content', html)
    }
    
    editor.customConfig.menus = this.props.menu

    editor.customConfig.uploadImgShowBase64 = true

    editor.create()
    
  }

  render() {
    return (
      <div>
        <div ref="editorElem" style={{textAlign: 'left'}}>
          <p style={{color: '#999'}}>请详细描述该问题</p>
        </div>
      </div>
    )
  }
}

export default ProblemEditor