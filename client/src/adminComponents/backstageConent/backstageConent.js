import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import BackstageAnalyze from '../backstageAnalyze/backstageAnalyze'
import BackstageUser from '../backstageUser/backstateUser'
import BackstageArticle from '../backstageArticle/backstageArticle'
import BackstageCourse from '../backstageCourse/backstageCourse'
import BackstageCourseCreate from '../backstageCourseCreate/backstageCourseCreate'
import BackstageCourseInfo from '../backstageCourseInfo/backstageCourseInfo'
import BackstageProblemList from '../backstageProblemList/backstageProblemList'
import BackstageCheckCenter from '../backstageCheckCenter/backstageCheckCenter'
import BackstageReportCenter from '../backstageReportCenter/backstageReportCenter'
import AdminBreadcrumb from '../adminBreadcrumb/adminBreadcrumb'

@withRouter
export default class BackstageConent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    // 如address为多级,用"-"分割
    const page = [
      {
        name: 'BackstageAnalyze',
        component: BackstageAnalyze,
        path: '/admin',
      },
      {
        name: 'BackstageUser',
        component: BackstageUser,
        path: '/admin/user',
        address: '用户列表'
      },
      {
        name: 'BackstageArticle',
        component: BackstageArticle,
        path: '/admin/article',
        address: '文章列表'
      },
      {
        name: 'BackstageCourse',
        component: BackstageCourse,
        path: '/admin/course',
        address: '课程列表'
      },
      {
        name: 'BackstageCourseCreate',
        component: BackstageCourseCreate,
        path: '/admin/course/create',
        address: '课程列表-新建课程'
      },
      {
        name: 'BackstageCourseInfo',
        component: BackstageCourseInfo,
        path: '/admin/course/info/:name',
        address: '课程列表-课程详情'
      },
      {
        name: 'BackstageProblemList',
        component: BackstageProblemList,
        path: '/admin/problem',
        address: '问题列表'
      },
      {
        name: 'BackstageCheckCenter',
        component: BackstageCheckCenter,
        path: '/admin/check',
        address: '审核中心'
      },
      {
        name: 'BackstageReportCenter',
        component: BackstageReportCenter,
        path: '/admin/report',
        address: '举报中心'
      },

    ]
    return (
      <React.Fragment>
        {
          page.map(v => {
            if (this.props.location.pathname === v.path && v.path.indexOf(':') === -1) {
              if (v.address) {
                const addressArr = v.address.split('-')
                return (
                  <React.Fragment key={v.name}>
                    <AdminBreadcrumb addressArr={addressArr} />
                    <Route path={v.path} component={v.component} key={v.name} exact></Route>
                  </React.Fragment>
                )
              }
              return <Route path={v.path} component={v.component} key={v.name}></Route>
            } else if (v.path.indexOf(':') !== -1 && this.props.location.pathname.indexOf(v.path.split(':')[0]) !== -1) {
              const addressArr = v.address.split('-')
              console.log(v.path)
              return (
                <React.Fragment key={v.name}>
                  <AdminBreadcrumb addressArr={addressArr} />
                  <Route path={v.path} component={v.component} key={v.name}></Route>
                </React.Fragment>
              )
            }
            return null
          })
        }
      </React.Fragment>
    )
  }
}
