import React, { Component } from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import './personCenterFocus.scss'
const TabPane = Tabs.TabPane
@connect((state) => state, {  })
export default class PersonCenterFocus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users:[]
    }
  }
  async componentDidMount() {
    await console.log(this.props.userstatus)
    // await axios({
		// 	method: 'POST',
    //   url: ' /api/users/ids',
    //   data:watch
		// }).then((res) => {
    //   console.log(res.data.data)
		// 	// this.setState({
		// 	// 	users: res.data.data
		// 	// })
		// })
  }
  render() {
    console.log(this.state.users)
    return (
      <div className="person-center-focus">
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large" >
          <TabPane tab="我关注的" key="1">
          {

          }
            <p >你还没有关注人，快去<a>看文章</a>吧</p>
          </TabPane>
          <TabPane tab="我的粉丝" key="2">
            <p>你还没有粉丝，可以先去<a>写写文章</a></p>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
