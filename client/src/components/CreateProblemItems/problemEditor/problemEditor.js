import React, { Component } from 'react'
import Simditor from 'simditor'

import 'simditor/styles/simditor.css'

class ProblemEditor extends Component {
  componentDidMount () {
    const Editor = document.getElementById("editor")
    const editor = new Simditor({
      textarea: Editor,
      //optional options
      placeholder: '详细说明（选填）',
      toolbar:[
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontScale',
        'color',
        'ol',
        'ul',
        'blockquote',
        'code',
        'table',
        'link',
        'image',
        'hr',
        'indent',
        'outdent',
        'alignment',
      ]
    })
  }
  render() {
    return (
      <div>
        <textarea id="editor" placeholder="Balabala" autoFocus></textarea>
      </div>
    )
  }
}

export default ProblemEditor