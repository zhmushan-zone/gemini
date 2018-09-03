import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { updateForumTags } from '@/redux/actions'

import './forumFollowClass.scss'

@connect(
  state => state.userstatus,
  { updateForumTags }
)
class forumFollowClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibale: false
    }
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    })
    this.props.updateForumTags(this.props.follow)
  }
  
  handleFollow (index) {
    const follow = [...this.props.follow]
    if (follow.indexOf(index) === -1) {
      this.props.followChange("follow", [...follow, index])
    } else {
      follow.splice(follow.indexOf(index), 1)
      this.props.followChange("follow", follow)
    }
  }

  render() {
    const myTags = this.props.follow.map(item => {
      return <Link to={`/forum/type/${item}`} key={item}>
        {myFollowClass[item]}
      </Link>
    })
    const allTags = myFollowClass.map((item, index) => {
      return (
        <a className={this.props.follow.indexOf(index) === -1 ? "" : "my-follow-tag"} onClick={() => this.handleFollow(index)} key={index}>
          <img src={require(`@/assets/forumIcon/${index}.jpg`)} alt=""/>
          <span>{item}</span>
        </a>
      )
    })
    return (
      <div className="forum-follow-class">
        <div className="follow-class-top">
          <h3>我关注的分类</h3>
          <span className="all-class" onClick={this.showModal}>+</span>
        </div>
        <div className="my-follow-class-container">
          {myTags}
        </div>
        <Modal
          title="管理我关注的分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          width={650}
          onCancel={this.handleCancel}
          footer={[
            <button className="forum-type-save-btn" onClick={this.handleOk}>保存</button>
          ]}
        >
          <div className="all-follow-class-container">
            {allTags}
          </div>
        </Modal>
      </div>
    )
  }
}

const myFollowClass = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']
export default forumFollowClass