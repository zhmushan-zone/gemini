import React, { Component } from 'react'
import { Tabs } from 'antd'
import BackstageReportCenterContent from '../backstageReportCenterContent/backstageReportCenterContent'
import { connect } from 'react-redux'
import { getReportsList } from '@/redux/actions'

import './backstageReportCenter.scss'

const TabPane = Tabs.TabPane

@connect((state) => state.report, { getReportsList })
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

	async componentDidMount() {
		await this.props.getReportsList()
	}

	render() {
		let report = this.props.reports
		return (
			<div className='backstage-report-center'>
				<Tabs defaultActiveKey='0' onChange={this.callback}>
					<TabPane tab='未处理' key='0'>
						<BackstageReportCenterContent report={report} Tabkey={this.state.key} />
					</TabPane>
					<TabPane tab='接受' key='1'>
						<BackstageReportCenterContent report={report} Tabkey={this.state.key} />
					</TabPane>
					<TabPane tab='拒绝' key='2'>
						<BackstageReportCenterContent report={report} Tabkey={this.state.key} />
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default BackstageReportCenter
