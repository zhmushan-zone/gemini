import React, { Component } from 'react'
import { Input } from 'antd'

import './backstageProblemList.scss'

const Search = Input.Search

class BackstageProblemList extends Component {
  render() {
    return (
      <div className="backstage-problem-list">
        <div className="backstage-problem-list-top">
          <Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={value => console.log(value)}
          />
        </div>
      </div>
    )
  }
}

export default BackstageProblemList