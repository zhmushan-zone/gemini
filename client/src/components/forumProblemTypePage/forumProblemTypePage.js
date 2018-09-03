import React, { Component } from 'react'
import { type as Type } from './type'
import { connect } from 'react-redux'
import { getProblemListByType, updateForumTags } from '@/redux/actions'
import ForumTypePageLeft from '../forumTypePageLeft/forumTypePageLeft'
import FourmTypePageRight from '../forumTypePageRight/forumTypePageRight'

import './forumProblemTypePage.scss'

@connect(
  state => state,
  { getProblemListByType, updateForumTags }
)
class ForumProblemTypePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      problems: []
    }
  }
  
  async componentDidMount() {
    await this.props.getProblemListByType([parseInt(this.props.match.params.type, 10)])
    
    this.setState({
      problems: this.props.problem.problem
    })
  }
  
  follow () {
    const oldTags = this.props.userstatus.watchTags
    const newTags = [...oldTags]
    const newTag = parseInt(this.props.match.params.type, 10)
    if (oldTags.indexOf(newTag) === -1) {
      newTags.push(newTag)
    } else {
      newTags.splice(oldTags.indexOf(newTag), 1)
    }
    this.props.updateForumTags(newTags)
  }

  render() {
    const typeIndex = this.props.match.params.type
    return (
      <div className="forum-problem-type-page">
        <div className="forum-problem-type-page-top">
          <div className="forum-problem-type-page-logo">
            <img src={require(`@/assets/forumIcon/${typeIndex}.jpg`)} alt=""/>
          </div>
          <h3>
            {Type[typeIndex].name}
          </h3>
          <div className="forum-problem-type-page-desc">
            <p>
            {Type[typeIndex].desc}
            </p>
          </div>
          <div className="type-page-follow-wrapper">
            {
              this.props.userstatus.watchTags.indexOf(parseInt(this.props.match.params.type, 10)) === -1 ?
              <a className="follow" onClick={() => this.follow()}>
                关注
              </a> :
              <a className="no-follow" onClick={() => this.follow()}>
                取消关注
              </a>
            }
          </div>
        </div>
        <div className="forum-type-page-content">
          {
            this.state.problems ? 
            <ForumTypePageLeft problems={this.state.problems} /> :
            null
          }
          <FourmTypePageRight />
        </div>
      </div>
    )
  }
}

export default ForumProblemTypePage