import React, { Component } from 'react'
import { Table, Divider } from 'antd'

class BackstageCourseList extends Component {
  render() {
    return <Table dataSource={dataSource} columns={columns} />
  }
}

const dataSource = [
  {
    key:'1',
    id: '1',
    title: 'React从入门到放弃',
    direction: '前端',
    type: 'React'
  }
]

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, 
  {
    title: '课程名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '课程方向',
    dataIndex: 'direction',
    key: 'direction',
  }, 
  {
    title: '课程分类',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <React.Fragment>
        <a>详情</a>
        <Divider type="vertical" />
        <a style={{color: '#f01414'}}>删除</a>
      </React.Fragment>
    ),
  }
]

export default BackstageCourseList