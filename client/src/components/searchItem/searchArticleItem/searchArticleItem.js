import React, { Component } from 'react' 
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import Marked from 'marked'
import { defaultAvatar } from '@/const'
import './searchArticleItem.scss'

class SearchArticleItem extends Component {
  removeHTMLTag(str) {
		str = str.replace(/<\/?[^>]*>/g, '') //去除HTML tag
		str = str.replace(/[ | ]*\n/g, '\n') //去除行尾空白
		//str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
		str = str.replace(/&nbsp;/gi, '') //去掉&nbsp;
		return str
	}
  render() {
    const { articleId ,title, content, coverImg, userAvatar, userName, createAt, viewNum } = this.props
    return (
      <div className="search-article-item">
        <div className="search-article-item-left">
          <Link to={`/article/${articleId}`}>
            <img src={`/cover-img/${coverImg}`} alt="" />
          </Link>
        </div>
        <div className="search-article-item-right">
          <Link to={`/article/${articleId}`} className="search-article-item-title">
            {title}
          </Link>
          <div className="search-article-item-content">
            <p>
              {this.removeHTMLTag(Marked(content))}
            </p>
          </div>
          <div className="search-article-item-data">
            <div className="search-article-item-data-left">
              <img src={userAvatar ? `/avatar/${userAvatar}` : defaultAvatar} alt=""/>
              <span className="search-article-item-username">{userName}</span>
              <span className="search-article-item-time">{createAt}</span>
            </div>
            <div className="search-article-item-data-right">
              <span className="search-article-item-viewnum">浏览{viewNum}</span>
              <Link to={`/article/${articleId}`} className="search-article-item-arrow">
                <Icon type="arrow-right" theme="outlined" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchArticleItem