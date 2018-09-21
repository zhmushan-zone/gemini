import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateForumTags } from '@/redux/actions'

import './forumProblemPageRelatedType.scss'

@connect(
  state => state.userstatus,
  { updateForumTags }
)
class ForumProblemPageRelatedType extends Component {
  updateTags (type) {
    const newTags = [...this.props.watchTags]
    const index = this.props.watchTags.indexOf(type)
    if (index === -1) {
      newTags.push(type)
    } else {
      newTags.splice(index, 1)
    }
    this.props.updateForumTags(newTags)
  }
  
  render() {
    return (
      <div className="foru-problem-page-related-type">
        <div className="forum-problem-page-title">
          相关分类
        </div>
        {
          this.props.type.map(item => {
            return <div className="related-type-item" key={item}>
              <div className="related-type-item-left">
                <div className="related-type-item-img">
                  <img src={require(`@/assets/forumIcon/${item}.jpg`)} alt=""/>
                </div>
                <div className="related-type-item-details">
                  <div className="related-type-item-name">
                    <Link to={`/forum/type/${item}`}>
                      {allClass[item]}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="related-type-item-right">
                <a onClick={() => this.updateTags(item)}>
                {
                  this.props.watchTags.indexOf(item) === -1 ?
                  "关注" :
                  "取消关注"
                }
                </a>
              </div>
            </div>
          })
        }
      </div>
    )
  }
}

const allClass = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default ForumProblemPageRelatedType