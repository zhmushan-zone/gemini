import React, { Component } from 'react'
import BackstageAnalyze from '../backstageAnalyze/backstageAnalyze'
import BackstageUser from '../backstageUser/backstateUser'
import BackstageCourse from '../backstageCourse/backstageCourse'
import AdminBreadcrumb from '../adminBreadcrumb/adminBreadcrumb'
import { withRouter } from 'react-router-dom'

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
        name: 'BackstageCourse',
        component: BackstageCourse,
        path: '/admin/course',
        address: '课程列表'
      },
      {

      }
    ]
    return (
      <React.Fragment>
        {
          page.map(v => {
            if (this.props.location.pathname === v.path) {
              if (v.address) {
                const addressArr = v.address.split('-')
                return (
                  <React.Fragment key={v.name}>
                    <AdminBreadcrumb addressArr={addressArr} />
                    <v.component />
                  </React.Fragment>
                )
              }
              return <v.component key={v.component} />
            }
            return null
          })
        }
      </React.Fragment>
    )
  }
}
