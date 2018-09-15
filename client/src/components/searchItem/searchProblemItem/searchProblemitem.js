import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ArticleType as Type } from '@/const'

import './searchProblemItem.scss'

class SearchProblemitem extends Component {
  render() {
    const { problemId, title, tags, replyNum } = this.props
    return (
      <div className="search-problem-item">
        <div className="search-problem-item-left">
          <img src={require(`@/assets/forumIcon/${tags[0]}.jpg`)} alt=""/>
        </div>
        <div className="search-problem-item-right">
          <div className="search-problem-item-tags">
            <span>来自</span>
            {
              tags.map(item => {
                return <Link to={`/forum/type/${item}`}>{Type[item]}</Link>
              })
            }
          </div>
          <p className="search-problem-item-title">
            {title}
          </p>
          <div className="search-problem-item-replysNum">
            共{replyNum}个回答
          </div>
        </div>
      </div>
    )
  }
}

export default SearchProblemitem