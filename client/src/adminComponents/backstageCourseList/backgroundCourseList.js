import React, { Component } from 'react'
import { Table, Divider, Modal, notification } from 'antd'
import { connect } from 'react-redux'
import { getCourseList, deleteCourse } from '@/redux/actions'
import { withRouter } from 'react-router-dom'
const confirm = Modal.confirm

@withRouter
@connect(
  state => state.course,
  { getCourseList, deleteCourse }
)
class BackstageCourseList extends Component {
  delete (id) {
    confirm({
      title: '删除课程',
      content: '删除该课程会造成该课程数据丢失,请确认您的操作',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await this.props.deleteCourse(id)
        this.props.getCourseList()
        notification['success']({
          message: '删除成功',
          description: '该课程的所有内容已从数据库中清除'
        })
      },
      onCancel:() => {

      },
    })
  }

  render() {
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
        title: '课程难度',
        dataIndex: 'difficulty',
        ket: 'difficulty'
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
        render: (text, record) => (
          <React.Fragment>
            <a onClick={() => this.props.history.push(`/admin/course/info/${'asd'}`)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(courses[record.key].id)} style={{color: '#f01414'}}>删除</a>
          </React.Fragment>
        ),
      }
    ]

    const courses = this.props.courses
    return <Table dataSource={this.props.data} columns={columns} />
  }
}

export default BackstageCourseList