import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

import './forumProblemPageRelatedProblem.scss'

@withRouter
class ForumProblemPageRelatedProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      relatedProblem: []
    }
  }
  
  async componentDidMount() {
    const res = await axios({
      method: 'post',
      url: '/api/issues/fetch/by-tag/intersect',
      data: {
        tags: this.props.type
      }
    })
    if (res.data.code === 1) {
      this.setState({
        relatedProblem: res.data.data
      })
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const res = await axios({
        method: 'post',
        url: '/api/issues/fetch/by-tag/intersect',
        data: {
          tags: nextProps.type
        }
      })
      if (res.data.code === 1) {
        this.setState({
          relatedProblem: res.data.data
        })
      }
    }
  }

  render() {
    return (
      <div className="forum-problem-page-related-problem">
        <div className="forum-problem-page-title">
          同类问题
        </div>
        <ul>
          {this.state.relatedProblem.map(item => {
            return (
              <li key={item.id}>
                <Link to={`/forum/details/${item.id}`}>{item.title}</Link>
                <span>2回答</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ForumProblemPageRelatedProblem