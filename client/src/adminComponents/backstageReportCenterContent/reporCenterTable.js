import React, { Component } from 'react'
import { Table, Divider, Tag } from 'antd'
import { reportReason } from '@/const'

class ReporCenterTable extends Component {
  render() {
    return <Table columns={columns} dataSource={data} style={{marginTop: 30}} />
  }
}

const columns = [{
  title: '举报者',
  dataIndex: 'reporter',
  key: 'reporter',
  render: text => <a>{text}</a>,
}, {
  title: '类型',
  key: 'type',
  dataIndex: 'type',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, {
  title: '原因',
  key: 'reason',
  dataIndex: 'reason'
}, {
  title: '内容',
  key: 'details',
  dataIndex: 'details',
  render: (text, record) => (
    <span>
      <a>详情</a>
    </span>
  )
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a>Invite {record.name}</a>
      <Divider type="vertical" />
      <a>Delete</a>
    </span>
  ),
}]

const data = [{
  key: '1',
  reporter: 'John Brown',
  type: ['答疑'],
  reason: '辱骂他人'
}, {
  key: '2',
  reporter: 'Jim Green',
  type: ['答疑', '评论'],
  reason: '侵权'
}, {
  key: '3',
  reporter: 'Joe Black',
  type: ['答疑', '回复'],
  reason: '抄袭'
}]

const alltype = [['答疑'], ['答疑', '评论'], ['答疑', '回复'], ['文章'], ['文章', '评论'], ['文章', '回复'], ['课程', '评论'], ['课程', '回复']]
export default ReporCenterTable