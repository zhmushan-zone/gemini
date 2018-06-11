import React, { Component } from 'react'
import { InputNumber } from 'antd'

class PriceInput extends Component {
  handleChange (v) {
    this.props.priceChange('price', v)
  }
  render() {
    return <InputNumber min={0} max={300} defaultValue={0} onChange={(v) => this.handleChange(v)} />
  }
}

export default PriceInput