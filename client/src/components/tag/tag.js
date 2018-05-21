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
    this.setState({
      checked: !this.state.checked
    })
    this.props.getChecked(!this.state.checked, value)
  }
  render() {
    var TagClass = classNames({
      'tag-span': true,
      'checked-color': this.state.checked,
    });
    return (
      <span className={TagClass} onClick={this.handle.bind(this)} value={this.props.text}>{this.props.text}</span>
    )
  }
}
