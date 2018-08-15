import React, { Component } from 'react'
import ForumProblemPageCommentsItem from '../forumProblemPageCommentsItem/forumProblemPageCommentsItem'

import './forumProblemPageComments.scss'

class ForumProblemPageComments extends Component {
  render() {
    return (
      <div className="forum-problem-page-comments">
        <div className="forum-problem-page-comments-num">
          276回答
        </div>
        {
          testData.map(item => {
            return <ForumProblemPageCommentsItem
              userName={item.userName}
              userAvatar={item.userAvatar}
              commentContent={item.commentContent}
              agreeData={item.agreeData}
              againstData={item.againstData}
              time={item.time}
              key={item.userName}
            />
          })
        }
      </div>
    )
  }
}

const testData = [
  {
    userName: '超人',
    userAvatar: 'SuperMan',
    commentContent: '作为DC一哥，我觉得，开始学任何一门编程语言都需要要耐心，特别是0基础，因为只有不断的学习，不断的实践，你才能熟练的掌握一门语言，三分钟热度是不可能学好的，所以加油吧，坚持学下去，你会和我一样强大。',
    agreeData: '676',
    againstData: '110',
    time: '2018-08-15'
  },

  {
    userName: '钢铁侠',
    userAvatar: 'IronMan',
    commentContent: '加油孩子，学好了来斯塔克工业，我罩着你',
    agreeData: '500',
    againstData: '110',
    time: '2018-08-15'
  },

  {
    userName: '蜘蛛侠',
    userAvatar: 'SpiderMan',
    commentContent: '如果有人命中注定成就伟大，那么孩子，这个人就是你',
    agreeData: '500',
    againstData: '110',
    time: '2018-08-15'
  },
]

export default ForumProblemPageComments