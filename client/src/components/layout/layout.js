import React from 'react'
import Nav from '../nav/nav'
class Layout extends React.Component {
	render() {
		return (
			<div className='my-layout-container' style={{flex: 1}}>
				<Nav />
				{this.props.children}
			</div>
		)
	}
}
export default Layout
