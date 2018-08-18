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
    
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ]

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