import React, { Component } from 'react'
import { Tabs } from 'antd'
import ProblemTable from '../backstageCheckTable/backstageCheckProblemTable/backstageCheckProblemTable'

import './backstageCheckCenter.scss'

const TabPane = Tabs.TabPane

class BackstageCheckCenter extends Component {
  render() {
    return (
      <div className="backstage-check-center">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="答疑" key="1">
            <ProblemTable />
          </TabPane>
          <TabPane tab="文章" key="2">
          
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default BackstageCheckCenter