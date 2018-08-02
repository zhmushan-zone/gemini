import React, { Component } from 'react'
import ForumLeft from '@/components/forumLeft/forumLeft'
import ForumRight from '@/components/forumRight/forumRight'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'

import './forum.scss'

@connect(
  state => state.userstatus
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
    const _token = Cookies.get('_token')
    const _id = Cookies.get('_id')
    const res = await axios({
      method: 'get',
      url: '/api/users',
      headers: {
        token: _token,
        id: _id
      }
    })
    this.setState({
      follow: res.data.data[0].watchTags
    })
  }

  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <div className="forum">
        <ForumLeft />
        <ForumRight follow={this.state.follow} stateChange={this.stateChange}/>
      </div>
    )
  }
}

export default Forum