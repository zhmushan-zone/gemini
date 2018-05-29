import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../containers/login/login'
import AutoRoute from './authRoute/authRoute'
import Layout from './layout/layout'
import PersonCenter from './personCenter/personCenter'
import Editor from './editor/editor'
import Home from '../containers/home/home'
import Footer from '../components/footer/footer'
import Admin from '../adminComponents/admin/admin'
import '@/assets/styles/normalize.scss'
// icon图标
import '@/assets/styles/font/icon.css'
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* 检验是否有登录信息 */}
        <AutoRoute />
        {/* 有了switch后，匹配到path后就不会再匹配下去了 */}
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/editor" component={Editor}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/" render={(props) => (
            <Layout>
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/personCenter" component={PersonCenter}></Route>
                <Redirect path="/" to={{ pathname: '/home' }} />       
              </Switch>
              <Footer />
            </Layout>
          )}></Route>
        </Switch>
      </React.Fragment>
    )
  }
}
export default App
