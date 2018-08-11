import React, { Component } from 'react'
import ProblemEditor from '../CreateProblemItems/problemEditor/problemEditor'
import ProblemTags from '../CreateProblemItems/problemTags/problemTags'

import './forumCreateProblemLeft.scss'

class ForumCreateProblemLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      type: []
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  stateChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div className="forum-create-problem-left">
        <h2>提问</h2>
        <input className="create-problem-title" type="text" placeholder="请用一句话简述你的问题" onChange={e => this.stateChange('title', e.target.value)}/>
        <ProblemEditor descChange={this.stateChange} />
        <ProblemTags tagsChange={this.stateChange} type={this.state.type} />
        <div className="problem-submit-wrapper">
          <button className="problem-submit">发布问题</button>
        </div>
      </div>
    )
  }
}

export default ForumCreateProblemLeft