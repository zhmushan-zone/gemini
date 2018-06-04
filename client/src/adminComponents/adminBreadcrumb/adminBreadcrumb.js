import React, { Component } from 'react'
import { Breadcrumb } from 'antd'

import './adminBreadcrumb.scss'

class AdminBreadcrumb extends Component {
  render() {
    const { addressArr } = this.props
    return (
      <div className="page-header">
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          {
            this.props.addressArr.map((item, index) => {
              return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            })
          }
        </Breadcrumb>
        <h1>{addressArr[addressArr.length - 1]}</h1>
      </div>
    )
  }
}

export default AdminBreadcrumb