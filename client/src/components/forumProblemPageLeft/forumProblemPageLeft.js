import React, { Component } from 'react'
import ForumProblemPageInfo from '../forumProblemPageInfo/forumProblemPageInfo'
import ForumProblemPageComments from '../forumProblemPageComments/forumProblemPageComments'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchComment } from '@/redux/actions'

@withRouter
@connect(
  state => state.problemComment,
  { fetchComment }
)
class ForumProblemPageLeft extends Component {
  componentDidMount() {
    this.props.fetchComment(this.props.problem.replysId)
  }
  
  async componentWillReceiveProps(nextProps) {
    if (nextProps.paramId !== this.props.paramId) {
      await nextProps.fetchComment(nextProps.problem.replysId)
    }
  }
  render() {
    return (
      <div className="forum-problem-page-left">
        <ForumProblemPageInfo paramId={this.props.paramId} currentProblem={this.props.problem}/>
        <ForumProblemPageComments replys={this.props.replys} problemId={this.props.problem.id} />
      </div>
    )
  }
}


export default ForumProblemPageLeft