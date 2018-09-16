import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../containers/login/login'
import AutoRoute from './authRoute/authRoute'
import Layout from './layout/layout'
import PersonCenter from './personCenter/personCenter'
import Editor from './editor/editor'
import forumCreateProblem from './forumCreateProblem/forumCreateProblem'
import Home from '../containers/home/home'
import OnlineStudying from '../containers/onlineStudying/onlineStudying'
import Forum from '../containers/forum/forum'
import ForumProblemPage from './forumProblemPage/forumProblemPage'
import ForumProblemTypePage from './forumProblemTypePage/forumProblemTypePage'
import Opinion from '../containers/opinion/opinion'
import Footer from './footer/footer'
import Admin from '../adminComponents/admin/admin'
import VideoPage from './video/videoPage'
import ArticleSample from '../components/articleSample/ArticleSample'
import OpinionFocus from './opinionFocus/opinionFocus'
import ArticleExcellentSeven from './articleExcellentSeven/articleExcellentSeven'
import ArticleExcellentThirty from './ArticleExcellentThirty/ArticleExcellentThirty'
import CoursePreview from './coursePreview/coursePreview'
import Search from '../containers/search/search'
import ShoppingCart from '../components/shoppingCart/shoppingCart'
import '@/assets/styles/normalize.scss'
// icon图标
import '@/assets/styles/font/icon.css'
import opinionRecommend from './opinionRecommend/opinionRecommend'
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
          <Route path="/video/:courseId" component={VideoPage}></Route>
          <Route path="/" render={(props) => (
            <Layout>
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/search/:content" component={Search}></Route>
                <Route path="/shoppingCart" component={ShoppingCart}></Route>
                <Route path="/onlineStudying" component={OnlineStudying}></Route>
                <Route path="/forum" component={Forum} exact></Route>
                <Route path="/forum/create" component={forumCreateProblem} exact></Route>
                <Route path="/forum/details/:id" component={ForumProblemPage}></Route>
                <Route path="/forum/type/:type" component={ForumProblemTypePage}></Route>
                <Route path="/opinion/focus" component={OpinionFocus}></Route>
                <Route path="/opinion/:category" component={Opinion}></Route>
                <Route path="/opinion" component={opinionRecommend}></Route>
                <Route path="/personCenter/:id" component={PersonCenter}></Route>
                <Route path="/article/:id" component={ArticleSample}></Route>
                <Route path="/excellentSeven" component={ArticleExcellentSeven}></Route>
                <Route path="/excellentThirty" component={ArticleExcellentThirty}></Route>
                <Route path="/class/:courseId" component={CoursePreview}></Route>
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
