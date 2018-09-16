import React from 'react'
import './loading.scss'

class Loading extends React.Component {
	render() {
		return (
			<div class="loading" style={this.props.style}>
				<div class="c1"></div>
				<div class="c2"></div>
				<div class="c3"></div>
				<div class="c4"></div>
			</div>
		)
	}
}

export default Loading
