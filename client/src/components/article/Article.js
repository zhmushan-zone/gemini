import React, { Component } from 'react'
import { connect } from 'react-redux'
@connect((state) => state)
export default class Article extends Component {
  render() {
    // 测试的文章
    // let 
    // const thisArticle = this.props.article.articles[0].id
    return (
      <div>
        文章名字：
      </div>
    )
  }
}
