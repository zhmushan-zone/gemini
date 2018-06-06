import React, { Component } from 'react'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane
export default class PersonCenterYuanwen extends Component {
  render() {
    return (
      <div className="person-center-article">
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large" >
          <TabPane tab="我的提问" key="1">
            <p className="notattend">你还没有任何原创文章，快去<a>发表文章</a>吧</p>
          </TabPane>
          <TabPane tab="我的回答" key="2">
            <p className="notattend">你还没有任何收藏，可以先去<a>看看文章</a></p>
          </TabPane>
          <TabPane tab="我的关注" key="3">
            <p className="notattend">你还没有任何推荐，可以先去<a>看看文章</a></p>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
