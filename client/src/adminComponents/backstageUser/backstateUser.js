import React from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import Cookie from 'js-cookie'
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
  
  async componentDidMount () {
    if (this.props.location.pathname === '/admin/user') {
      const _id = Cookie.get('_id')
      const _token = Cookie.get('_token')
      await Axios.get('/api/users', {
        headers: {
          "id": _id,
          "token": _token,
        }
      }).then(res => {
        if (res.data.code === 1) {
          res.data.data.map(v => {
            if (v.role === 0) {
              const data = {
                key: v.id,
                name: v.nickname ? v.nickname : v.username,
                city: v.city ? v.city : '该用户未未设置',
                sex: v.sex ? v.sex===0?'女':'男' : '该用户未未设置',
                job: v.job ? v.job : '该用户未未设置',
                description: v.signature ? v.signature : '未设置签名'
              }
              this.state.users.push(data)
              this.setState({
                users: this.state.users
              })
            }
          })
        } else {
          console.log('出错了')
        }
      })

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
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => <a href="">删除</a>
      },
    ]
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