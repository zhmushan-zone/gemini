import React, { Component } from 'react'
import ForumLeft from '@/components/forumLeft/forumLeft'
import ForumRight from '@/components/forumRight/forumRight'
import { connect } from 'react-redux'
import { getProblemList, fetchUser } from '@/redux/actions'
import Cookies from 'js-cookie'

import './forum.scss'

@connect(
  state => state,
  { getProblemList, fetchUser }
)
class Forum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      follow: []
    }
    this.stateChange = this.stateChange.bind(this)
  }

  async componentDidMount() {
    const _id = Cookies.get('_id')
    this.props.getProblemList()
    await this.props.fetchUser(_id)
    this.setState({
      follow: this.props.User.watchTags
    })
  }

  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const problems = this.props.problem.problem
    return (
      <div className="forum">
        <ForumLeft problems={problems} />
        <ForumRight follow={this.state.follow} stateChange={this.stateChange}/>
      </div>
    )
  }
}

export default Forum