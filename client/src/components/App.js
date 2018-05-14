import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../containers/login/login'
import AutoRoute from './authRoute/authRoute'
import Nav from './nav/nav'
import Home from '../containers/home/home'
import '@/assets/styles/normalize.scss'
// icon图标
import '@/assets/styles/font/icon.css'
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav></Nav>
        {/* 检验是否有登录信息 */}
        <AutoRoute />
        {/* 有了switch后，匹配到path后就不会再匹配下去了 */}
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          {/* <Redirect from="/" to="/home"></Redirect>
            <Route component={Home}></Route> */}
        </Switch>
      </React.Fragment>
    )
  }
}
export default App
