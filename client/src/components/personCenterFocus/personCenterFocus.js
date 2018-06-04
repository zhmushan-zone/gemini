import React, { Component } from 'react'
import { Tabs } from 'antd'
import './personCenterFocus.scss'
const TabPane = Tabs.TabPane
export default class PersonCenterFocus extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="person-center-focus">
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large" >
          <TabPane tab="我关注的" key="1">
            <p >你还没有关注人，快去<a>发表文章</a>吧</p>
          </TabPane>
          <TabPane tab="我的粉丝" key="2">
            <p>你还没有粉丝，可以先去<a>看看文章</a></p>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
