import React from 'react'
import Nav from '../nav/nav'
class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Nav></Nav>
        {this.props.children}
      </React.Fragment>
    )
  }
}
export default Layout
