import React, { Component } from 'react' 
import Marked from 'marked'

import './searchArticleItem.scss'

class SearchArticleItem extends Component {
  render() {
    return (
      <div className="search-article-item">
        {Marked('### 哈哈哈')}
      </div>
    )
  }
}

export default SearchArticleItem