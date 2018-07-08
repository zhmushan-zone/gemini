import React, { Component } from 'react'
import { Modal, Button } from 'antd'

import './forumFollowClass.scss'

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
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    })
  }
  
  render() {
    const tags = myFollowClass.map(item => {
      return <a key={item}>{item}</a>
    })
    return (
      <div className="forum-follow-class">
        <div className="follow-class-top">
          <h3>我关注的分类</h3>
          <span className="all-class" onClick={this.showModal}>+</span>
        </div>
        <div className="my-follow-class-container">
          {tags}
        </div>
        <Modal
          title="管理我关注的分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <button className="forum-type-save-btn" onClick={this.handleOk}>保存</button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

const myFollowClass = ['Javascript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']
console.log(myFollowClass.length)
export default forumFollowClass