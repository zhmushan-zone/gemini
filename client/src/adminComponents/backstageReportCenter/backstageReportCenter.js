import React, { Component } from 'react'
import { Tabs } from 'antd'
import BackstageReportCenterContent from '../backstageReportCenterContent/backstageReportCenterContent'

import './backstageReportCenter.scss'

const TabPane = Tabs.TabPane

class BackstageReportCenter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			key: 0,
    }
    this.callback = this.callback.bind(this)
	}
	callback(key) {
		this.setState({
			key: key,
		})
	}


	render() {
		let report = this.props.reports
		return (
			<div className='backstage-report-center'>
				<Tabs defaultActiveKey='0' onChange={this.callback}>
					<TabPane tab='未处理' key='0'>
						<BackstageReportCenterContent  Tabkey={this.state.key} />
					</TabPane>
					<TabPane tab='已处理' key='1'>
						<BackstageReportCenterContent Tabkey={this.state.key} />
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default BackstageReportCenter
