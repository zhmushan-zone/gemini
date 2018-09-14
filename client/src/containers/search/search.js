import React, { Component } from 'react'
import { Icon } from 'antd'
import { Tabs } from 'antd'
import SearchArticleItem from '../../components/searchItem/searchArticleItem/searchArticleItem'

import './search.scss'

const TabPane = Tabs.TabPane

class Search extends Component {
  callback(key) {
    console.log(key)
  }
  render() {
    const hotKey = ['React', 'Vue', 'Python', 'Angular', '算法', '大数据', '人工智能', '小程序']
    return (
      <div className="search">
        <div className="search-top">
          <div className="search-input-wrapper">
            <div className="search-icon">
              <Icon type="search" theme="outlined" />
            </div>
            <input type="text" placeholder="请输入你想搜素的内容"/>
            <a className="search-btn">
              搜索
            </a>
          </div>
          <div className="hot-search-key">
            热搜关键字:
            {
              hotKey.map((item, index) => {
                return <a key={index}>{item}</a>
              })
            }
          </div>
        </div>
        <div className="search-wrapper">
          <div className="search-content">
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="课程" key="1">
                <SearchArticleItem />
              </TabPane>
              <TabPane tab="答疑" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="看法" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default Search