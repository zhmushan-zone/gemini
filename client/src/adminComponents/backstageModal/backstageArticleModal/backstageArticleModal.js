import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { defaultAvatar } from '@/const'

import '../backstageProblemModal/backstageProblemModal.scss'

class BackstageArticleModal extends Component {
	render() {
		return (
			<Modal
				title={this.props.title}
				visible={this.props.visible}
				onCancel={this.props.handleCancel}
				footer={[
					<Button key='ok' type='primary' onClick={this.props.handleCancel}>
						确认
					</Button>,
				]}
			>
				<div className='problem-modal-content'>
					<div className='problem-modal-user-info'>
						<img src={this.props.userAvatar ? `/avatar/${this.props.userAvatar}` : defaultAvatar} alt='' />
						<span>{this.props.userName}</span>
					</div>
					<div className='problem-modal-content' dangerouslySetInnerHTML={{ __html: this.props.content }} />
				</div>
			</Modal>
		)
	}
}

export default BackstageArticleModal
