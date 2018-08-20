import React, { Component } from 'react'
import ForumProblemPageInfo from '../forumProblemPageInfo/forumProblemPageInfo'
import ForumProblemPageComments from '../forumProblemPageComments/forumProblemPageComments'
import { connect } from 'react-redux'
import { fetchComment } from '@/redux/actions'

@connect(
  state => state.problemComment,
  { fetchComment }
)
class ForumProblemPageLeft extends Component {
  componentDidMount() {
    this.props.fetchComment(this.props.problem.replysId)
  }
  render() {
    return (
      <div className="forum-problem-page-left">
        <ForumProblemPageInfo currentProblem={this.props.problem}/>
        <ForumProblemPageComments replys={this.props.replys} />
      </div>
    )
  }
}


export default ForumProblemPageLeft