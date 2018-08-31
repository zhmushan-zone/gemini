import React, { Component } from 'react'
import ArticleCommentsItem from '../articleCommentsItem/articleCommentsItem'
import { getArticleComment } from '@/redux/actions.js'
import Cookies from 'js-cookie'
import './articleComments.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
@withRouter
@connect(
  state=>state,
  {getArticleComment}
)
class ArticleComments extends Component {
  async componentDidMount() {
    const  commentsId = Cookies.get('commentsId')
    setTimeout(()=>{
      this.props.getArticleComment(JSON.parse(commentsId))
    },100)
  }
  render() {
    const articleComment = this.props.article.comment
    return (
      <div className="article-page-comments">
        <div className="article-page-comments-num">
          {this.props.article.comment.length}回答
        </div>
        {articleComment?
          articleComment.map(item => {
            return <ArticleCommentsItem
              userName={item.authorUsername}
              userAvatar={item.authorAvatar}
              commentContent={item.content}
              agreeData={item.upersId.length}
              againstData={item.downersId.length}
              time={item.updateAt}
              replys={item.commentsId.length}
              key={item.updateAt}
            />
          }):null
        }
      </div>
    )
  }
}

// const testData = [
//   {
//     userName: '钢铁侠',
//     userAvatar: 'IronMan',
//     commentContent: '加油孩子，学好了来斯塔克工业，我罩着你',
//     agreeData: '500',
//     againstData: '110',
//     time: '2018-08-15',
//     replys: [
//       {
//         replyerName: '绿箭侠',
//         replyerAvatar: 'Arrow',
//         replyContent: '超人，偶像啊！！！你说的好有道理，我就按你说的做，一定能取得很大的进步的！！！',
//         replyTime: '2018-08-15'
//       }
//     ]
//   }
// ]

export default ArticleComments