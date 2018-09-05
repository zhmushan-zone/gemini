import React, { Component } from 'react'
import { Modal, Button } from 'antd'

import './backstageProblemModal.scss'

class BackstageProblemModal extends Component {
  render() {
    return <Modal
    title={this.props.title}
    visible={this.props.visible}
    onCancel={this.props.handleCancel}
    footer={[
      <Button key="ok" type="primary" onClick={this.props.handleCancel}>确认</Button>
    ]}
  >
    <div className="problem-modal-content">
      <div className="problem-modal-user-info">
        <img src={this.props.authorAvatar ? `/avatar/${this.props.authorAvatar}` : 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt=""/>
        <span>{this.props.userName}</span>
      </div>
      <div className="problem-modal-content" dangerouslySetInnerHTML = {{__html: this.props.content}}></div>
    </div>
  </Modal>
  }
}

export default BackstageProblemModal