import React, { Component } from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag

class backstageTag extends Component {
	handleChange = () => {
		const { showType, type, len } = this.props
		let newShowType = [ ...showType ]
		if (showType.indexOf(type) === -1 && type !== 0) {
			newShowType.push(type)
			if (newShowType.length === len - 1) {
				newShowType = Array.from({ length: len }, (v, i) => i)
			}
		} else if (showType.indexOf(type) === -1 && type === 0) {
			newShowType = Array.from({ length: len }, (v, i) => i)
		} else if (showType.indexOf(type) !== -1 && type !== 0) {
			newShowType.splice(newShowType.indexOf(type), 1)
			if (showType.indexOf(0) !== -1) {
				newShowType.splice(newShowType.indexOf(0), 1)
			}
		} else if (showType.indexOf(type) !== -1 && type === 0) {
			newShowType = []
		}
		this.props.stateChange('showType', newShowType)
	}

	render() {
		const { showType, type } = this.props
		const isChecked = !(showType.indexOf(type) === -1)
		return (
			<CheckableTag
				checked={isChecked}
				onChange={this.handleChange}
				style={{ marginRight: 24, fontSize: 14, marginBottom: 10 }}
			>
				{this.props.children}
			</CheckableTag>
		)
	}
}

export default backstageTag
