import React from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import jsCookie from 'js-cookie'
@withRouter
@connect(
  state => state,
  {}
)
class BackstateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount = () => {

    if (this.props.location.pathname === '/admin/user') {
      setTimeout(() => {
        Axios.get('/api/users', {
          headers: {
            "id": jsCookie.get('_id'),
            "token": jsCookie.get('_token'),
          }
        }).then(res => {
          if (res.data.code === 1) {
            res.data.data.map(v => {
              const data = {
                key: v.id,
                name: v.nickname ? v.nickname : v.username,
                city: v.city ? v.city : '该用户未未设置',
                sex: v.sex ? v.sex : '该用户未未设置',
                job: v.job ? v.job : '该用户未未设置',
                description: v.signature ? v.signature : '未设置签名'
              }
              this.state.users.push(data)
              this.setState({
                users: this.state.users
              })
            })
          } else {
            console.log('出错了')
          }
        })
      }, 100)

    }
  }

  render() {
    const columns = [
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '职位',
        dataIndex: 'job',
        key: 'job',
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a href="">Delete</a>
      },
    ]
    // 这是假数据
    // const data = [
    //   {
    //     key: 1,
    //     name: '张三',
    //     city: '深圳',
    //     sex: '男',
    //     job: '后端',
    //     description: '啊哈哈哈'
    //   },
    //   {
    //     key: 2,
    //     name: '李四',
    //     city: '北京',
    //     sex: '男',
    //     job: '前端',
    //     description: '签名1'
    //   },
    //   {
    //     key: 3,
    //     name: '李二狗',
    //     city: '杭州',
    //     sex: '男',
    //     job: '安卓开发',
    //     description: '签名二'
    //   },
    // ]
    return (
      <React.Fragment>
        <Table
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 10 }}>{record.description}</p>}
          dataSource={this.state.users}
        />
      </React.Fragment>
    )
  }
}
export default BackstateUser