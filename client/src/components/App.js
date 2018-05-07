import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './login/login'
import Home from './home/home'
import '@/assets/styles/normalize.scss'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          {/* 有了switch后，匹配到path后就不会再匹配下去了 */}
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Redirect from="/" to="/home"></Redirect>
            <Route component={Home}></Route>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
export default App