import React, { Component } from 'react'
import ForumProblemPageLeft from '../forumProblemPageLeft/forumProblemPageLeft'
import ForumProblemPageRight from '../forumProblemPageRight/forumProblemPageRight'
import axios from 'axios'

import './forumProblemPage.scss'

class ForumProblemPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      problem: null
    }
  }
  
  async componentDidMount() {
    const res = await axios.get(`/api/issues/${this.props.match.params.id}`)
    if (res.data.code === 1) {
      this.setState({
        problem: res.data.data
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        {
          this.state.problem ? 
          <div className="forum-problem-page">
            <ForumProblemPageLeft problem={this.state.problem} />
            <ForumProblemPageRight tags={this.state.problem.tags} />
          </div> : null
        }
      </React.Fragment>
    )
  }
}

export default ForumProblemPage