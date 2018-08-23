import React, { Component } from 'react'
import ForumProblemPageLeft from '../forumProblemPageLeft/forumProblemPageLeft'
import ForumProblemPageRight from '../forumProblemPageRight/forumProblemPageRight'
import axios from 'axios'

import './forumProblemPage.scss'

class ForumProblemPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      problem: null,
      paramId: ''
    }
  }
  
  async componentDidMount() {
    const res = await axios.get(`/api/issues/${this.props.match.params.id}`)
    if (res.data.code === 1) {
      this.setState({
        problem: res.data.data,
        paramId: this.props.match.params.id
      })
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const res = await axios.get(`/api/issues/${nextProps.match.params.id}`)
      if (res.data.code === 1) {
        this.setState({
          problem: res.data.data,
          paramId: nextProps.match.params.id
        })
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.paramId === nextState.paramId)
  }
  
  render() {
    return (
      <React.Fragment>
        {
          this.state.problem ? 
          <div className="forum-problem-page">
            <ForumProblemPageLeft paramId={this.state.paramId} problem={this.state.problem} />
            <ForumProblemPageRight tags={this.state.problem.tags} />
          </div> : null
        }
      </React.Fragment>
    )
  }
}

export default ForumProblemPage