import React from 'react'
import './loading.scss'

class Loading extends React.Component {
	render() {
		return (
			<div className="loading" style={this.props.style}>
				<div className="c1"></div>
				<div className="c2"></div>
				<div className="c3"></div>
				<div className="c4"></div>
			</div>
		)
	}
}

export default Loading
