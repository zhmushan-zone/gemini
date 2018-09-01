import React, { Component } from 'react'
import { Tabs } from 'antd'
import BackstageReportCenterContent from '../backstageReportCenterContent/backstageReportCenterContent'
import { connect } from 'react-redux'
import { getReportsList } from '@/redux/actions'

import './backstageReportCenter.scss'

const TabPane = Tabs.TabPane

@connect(
  state => state.report,
  { getReportsList }
)
class BackstageReportCenter extends Component {
  callback(key) {
    console.log(key)
  }

  componentDidMount() {
    this.props.getReportsList()
  }

  render() {
    console.log(this.props.reports)
    return (
      <div className="backstage-report-center">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="全部" key="1">
            <BackstageReportCenterContent />
          </TabPane>
          <TabPane tab="未处理" key="2">
            <BackstageReportCenterContent />
          </TabPane>
          <TabPane tab="已处理" key="3">
            <BackstageReportCenterContent />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default BackstageReportCenter