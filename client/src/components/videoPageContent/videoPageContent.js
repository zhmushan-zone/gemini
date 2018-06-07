import React, { Component } from 'react'
import './videoPageContent.scss'
function A() {
  return (
    <h2>1212</h2>
  )
}
function B() {
  return (
    <h2>121B2</h2>
  )
}
function C() {
  return (
    <h2>12c12</h2>
  )
}
export default class VideoPageContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: [
        {
          '问答': 'true',
          component: A
        },
        {
          '评论': 'false',
          component: B
        },
        {
          '笔记': 'false',
          component: C
        }
      ],
      firstKey: '问答'
    }
  }
  render() {
    return (
      <div className="video-page-content">
        <div className="course-subnav">
          <ul>
            {this.state.show.map((v) => {
              let value = Object.values(v)[0]
              let key = Object.keys(v)[0]
              let lastkey = this.state.firstKey
              return (<li key={key} className={value === 'true' ? `current` : ''} onClick={() => {
                this.state.show.map((v) => {
                  return v[lastkey] = 'false'
                })
                v[key] = 'true'
                this.setState({
                  show: this.state.show,
                  firstKey: key
                })
              }}>{key}</li>)
            })}
          </ul>
        </div>
        {
          this.state.show.map((v, index) => {
            let value = Object.values(v)[0]
            return (
              <div key={index} style={value === 'true' ? { 'display': 'block' } : { 'display': 'none' }}>
                <v.component/>
              </div>
            )
          })
        }
      </div >
    )
  }
}
