import React from 'react'
import PropTypes from 'prop-types';

const CustomIcon = (props) => {
  const { type } = props
  return <i className={`iconfont icon-${type}`} style={{ fontSize: props.size }}></i>
}
CustomIcon.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string
}
export default CustomIcon;
