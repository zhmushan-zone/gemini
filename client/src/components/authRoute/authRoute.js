import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
/* 引入后就能变成路由组件 */
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '@/redux/actions'
@withRouter
@connect(
  state => state.userstatus,
  { loadData }
)
class AutoRoute extends React.Component {
  componentDidMount() {
    console.log(this.props)
    var publicList = ['/login']
    var pathname = this.props.location.pathname
    console.log(pathname)
    if (publicList.indexOf(pathname) !== -1) {
      return null
    }
    axios.get('/api/users/auth', {
      headers: {
        "id": Cookies.get('_id'),
        "token": Cookies.get('_token'),
      }
    })
      .then(res => {
        if (res.data.code === 1) {
          // 有登录信息
          // 其实是为了解决刷新的时候虽然页面不跳转但是，数据没了
          this.props.loadData(res.data.data)
        } else {
          // 无登录信息
          this.props.history.push('/login')
        }
      })
  }

  render() {
    return null
  }
}
export default AutoRoute
