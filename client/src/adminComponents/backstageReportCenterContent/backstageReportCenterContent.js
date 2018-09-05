import React, { Component } from 'react'
import ReportTag from '../backstageTag/backstageTag'
import ReportCenterTable from './reporCenterTable'

class BackstageReportCenterContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showType: Array.from({length: tags.length}, (v, i) => i)
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  handleChange(value) {
    console.log(`selected ${value}`)
  }

  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const tagItems = tags.map((item, index) => {
      return <ReportTag
                type={index}
                key={index}
                len={tags.length}
                showType={this.state.showType}
                stateChange={this.stateChange}
              >
              {item}
            </ReportTag>
    })
    return (
      <div className="backstage-report-center-content" style={{paddingTop: 10}}>
        <div className="backstage-report-center-tags">
          <span style={{marginRight: 18, display: 'inline-block', lineHeight: '32px'}}>所属类目：</span>
          {tagItems}
        </div>
        <ReportCenterTable />
      </div>
    )
  }
}

const tags = ['全部', '课程区', '答疑区', '文章区']

export default BackstageReportCenterContent