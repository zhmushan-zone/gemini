import React, { Component } from 'react'
import { Tabs, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import './personCenterUpload.scss'
const TabPane = Tabs.TabPane
@withRouter

export default class PersonCenterUpload extends Component {
  render() {
    return (
      <div className="person-center-upload">
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large" tabBarExtraContent={
          <Button size="large" onClick={() => {
            console.log(this.props.history.push('/uploadVideo'))
          }}>上传视频</Button>}>
          <TabPane tab="我的视频" key="1">
            <p className="notattend">你还没有上传视频，快去<a>发表文章</a>吧</p>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
