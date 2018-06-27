import React, { Component } from 'react'
import classNames from 'classnames'
import './tag.scss'
export default class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  handle(e) {
    const value = e.currentTarget.innerHTML
    const index = this.props.index
    this.setState({
      checked: !this.state.checked
    })
    this.props.getChecked(!this.state.checked, value,index)
  }
  render() {
    var TagClass = classNames({
      'tag-span': true,
      'checked-color': this.state.checked,
    })
    return (
      <span className={TagClass} onClick={this.handle.bind(this)} value={this.props.text}>{this.props.text}</span>
    )
  }
}
