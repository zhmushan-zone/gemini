import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
/* 引入后就能变成路由组件 */
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '@/redux/actions'
@withRouter
@connect(
  state=>state,
  { loadData }
)
class AutoRoute extends React.Component {
  componentDidMount() {
    var publicList = ['/login']
    var pathname = this.props.location.pathname
    var _id = Cookies.get('_id')
    var _token = Cookies.get('_token')
    if (publicList.indexOf(pathname) !== -1) {
      return null
    }
    axios.get('/api/users/auth', {
      headers: {
        "id": _id,
        "token": _token,
      }
    })
      .then(res => {
        if (res.data.code === 1) {
          console.log('auth')
          // 有登录信息
          // 其实是为了解决刷新的时候虽然页面不跳转但是，数据没了
          this.props.loadData(res.data.data)
          Cookies.set('_token', res.data.data.token)
        }
      })
  }

  render() {
    return null
  }
}
export default AutoRoute
