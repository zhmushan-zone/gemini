import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BackstageAnalyze from '../backstageAnalyze/backstageAnalyze'
import BackstageUser from '../backstageUser/backstateUser'
import BackstageArticle from '../backstageArticle/backstageArticle'
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
        name: 'BackstageArticle',
        component: BackstageArticle,
        path: '/admin/article'
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
