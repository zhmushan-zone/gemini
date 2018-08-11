import React, { Component } from 'react'

import './forumCreateProblemRight.scss'

class ForumCreateProblemRight extends Component {
  render() {
    return (
      <div className="forum-create-problem-right">
        <h1>提问注意事项</h1>
        <dl>
          <dd>1、为防止刷积分和恶意刷屏的情况发生，每人每天最多提3个问题，每提一个问题将扣除10积分。</dd>
          <dd>2、在提问题前，您可以通过搜索引擎，搜索是否有类似的问题存在，可以帮您节省积分哦。</dd>
          <dd>3、假如搜索不到您想要的答案，请您尽可能详细和准确的描述您的问题，确认无误后提交。</dd>
          <dd>4、问题提交后管理员会进行审核，如内容合法，在管理员确认后该问题才会进行发布。</dd>
          <dd>5、最后预祝您的问题能够得到解答。</dd>
        </dl>
      </div>
    )
  }
}

export default ForumCreateProblemRight