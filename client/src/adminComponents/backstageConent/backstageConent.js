import React, { Component } from 'react'
import BackstageAnalyze from '../backstageAnalyze/backstageAnalyze'
import BackstageUser from '../backstageUser/backstateUser'
import { withRouter } from 'react-router-dom'
@withRouter
export default class BackstageConent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const page = [
      {
        name: 'BackstageAnalyze',
        component: BackstageAnalyze,
        path: '/admin',
      },
      {
        name: 'BackstageUser',
        component: BackstageUser,
        path: '/admin/user'
      },
      {

      },
      {

      }
    ]
    return (
      <React.Fragment>
        {
          page.map(v => {
            return this.props.location.pathname === v.path ? <v.component key={v.component} /> : null
          })
        }
      </React.Fragment>
    )
  }
}
