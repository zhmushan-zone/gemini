import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import './searchCourseItem.scss'

class SearchCourseItem extends Component {
  render() {
    const { courseId, title, content, coverImg, authorName, authorAvatar, difficulty, desc, joinersNum } = this.props
    const difficultites = ['基础', '中级', '进阶']
    return (
      <div className="search-course-item">
        <div className="search-course-item-left">
          <Link to={`/class/${courseId}`}>
            <img src={`/cover-img/${coverImg}`} alt=""/>
          </Link>
        </div>
        <div className="search-course-item-right">
          <div className="search-course-item-title">
            <Link to={`/class/${courseId}`}>
              {title}
            </Link>
          </div>
          <div className="search-course-item-data">
            <span>作者:</span>
            <span style={{marginLeft: 8}}>{authorName}</span>
            <span style={{marginLeft: 30}}>{difficultites[difficulty]}</span>
            <span  style={{marginLeft: 30}}>
              <Icon type="user" theme="outlined" />
              {joinersNum}
            </span>
          </div>
          <p className="search-course-item-desc">
            {desc}
          </p>
        </div>
      </div>
    )
  }
}

export default SearchCourseItem