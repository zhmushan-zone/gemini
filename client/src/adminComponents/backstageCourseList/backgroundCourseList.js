import React, { Component } from 'react'
import { Table, Divider, Modal, notification } from 'antd'
import { connect } from 'react-redux'
import { getCourseList, deleteCourse } from '@/redux/actions'
const confirm = Modal.confirm

@connect(
  state => state.course,
  { getCourseList, deleteCourse }
)
class BackstageCourseList extends Component {
  componentDidMount() {
    this.props.getCourseList()
  }
  
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
            <a>详情</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(courses[record.key].id)} style={{color: '#f01414'}}>删除</a>
          </React.Fragment>
        ),
      }
    ]

    const courses = this.props.courses
    const data = courses.map((item, index) => {
      return {
        key: index,
        id: index,
        title: item.title,
        difficulty: difficulty[item.difficulty],
        direction: direction[item.direction],
        type: item.type.map(i => {
          return type1[i]
        }).join(',')
      }
    })
    return <Table dataSource={data} columns={columns} />
  }
}


const direction = ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const type = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

const type1 = type.join().split(',')

const difficulty = [
  '基础',
  '中级',
  '进阶'
]

export default BackstageCourseList