import React, { Component } from 'react'
import Simditor from 'simditor'

import 'simditor/styles/simditor.css'

class ProblemEditor extends Component {
  componentDidMount () {
    const Editor = document.querySelector('#editor')
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
        'image'
      ]
    })

    editor.on('valuechanged', () => {
      this.props.descChange('desc', this.getValue())
    })
  }

  getValue() {
    const body = document.querySelector('.simditor-body')
    const content = body.innerHTML
    return content
  }

  render() {
    return (
      <div>
        <textarea id="editor" placeholder="Balabala" autoFocus onChange={e => this.props.descChange('desc', e.target.value)}></textarea>
      </div>
    )
  }
}

export default ProblemEditor