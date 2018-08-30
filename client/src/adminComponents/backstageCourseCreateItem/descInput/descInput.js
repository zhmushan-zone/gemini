import React, { Component } from 'react'
import { Input } from 'antd'
const { TextArea } = Input

class DescInput extends Component {
	render() {
		const { descChange } = this.props
		return <TextArea rows={4} onChange={(e) => descChange('desc', e.target.value)} />
	}
}

export default DescInput
