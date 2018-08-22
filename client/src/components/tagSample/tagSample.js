import React, { Component } from 'react'
import { ArticleType } from '../../const'
export default class tagSample extends Component {
	render() {
		const TagWrap = {
			display: 'inline-block',
			marginRight: '12px',
			padding: '4px 12px',
			background: 'rgba(84,92,99,.1)',
			borderRadius: '12px',
			fontSize: '12px',
			color: '#545c63',
			lineHeight: '16px'
		}

		return (
			<div style={TagWrap}>
				{ArticleType.map((v, i) => {
					if (this.props.name === i) {
						return v
					}
				})}
			</div>
		)
	}
}
