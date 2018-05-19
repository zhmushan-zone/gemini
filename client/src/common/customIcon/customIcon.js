import React from 'react'
import PropTypes from 'prop-types'

const CustomIcon = (props) => {
  const { type, className, color, size } = props
  return <i className={`iconfont icon-${type} ${className}`} style={{ fontSize: `${size}px`, color }}></i>
}
CustomIcon.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string
}
export default CustomIcon
