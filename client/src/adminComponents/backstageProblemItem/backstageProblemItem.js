import React, { Component } from 'react'
import { Tag, Icon } from 'antd'
import BackstageProblemModal from '../backstageModal/backstageProblemModal/backstageProblemModal'
import { defaultAvatar } from '@/const'

import './backstagePronblemItem.scss'

class BackstageProblemItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
		}
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		})
	}

	render() {
		const { authorName, authorAvatar, title, tags, content, createTime, viewNum, followNum, replyNum } = this.props
		return (
			<div className='backstage-problem-item'>
				<h4>
					<a onClick={this.showModal}>{title}</a>
				</h4>
				<div className='backstage-problem-item-tags'>
					{tags.map((item, index) => {
						return <Tag key={index}>{allTags[item]}</Tag>
					})}
				</div>
				<div className='backstage-problem-item-content' dangerouslySetInnerHTML={{ __html: content }} />
				<div className='backstage-problem-item-authorInfo'>
					<img src={authorAvatar ? `/avatar/${authorAvatar}` : defaultAvatar} alt='' />
					<a style={{ marginLeft: 10 }}>{authorName}</a>
					<span>发布于</span>
					<span style={{ color: 'rgba(0, 0, 0, .25)' }}>{createTime}</span>
				</div>
				<div className='backstage-problem-item-data'>
					<ul>
						<li>
							<Icon type='eye' />
							<span>{viewNum}</span>
						</li>
						<em />
						<li>
							<Icon type='heart' />
							<span>{followNum}</span>
						</li>
						<em />
						<li>
							<Icon type='message' />
							<span>{replyNum}</span>
						</li>
					</ul>
				</div>
				<BackstageProblemModal
					visible={this.state.visible}
					handleCancel={this.handleCancel}
					userName={authorName}
					userAvatar={authorAvatar}
					title={title}
					content={content}
				/>
			</div>
		)
	}
}

const allTags = [
	'JavaScript',
	'Node.js',
	'Vue',
	'React',
	'Html5',
	'Html/CSS',
	'Angular',
	'WebApp',
	'Jquery',
	'Bootstrap',
	'前端工具',
	'CSS3',
	'Sass/Less',
	'JAVA',
	'Python',
	'Go',
	'PHP',
	'C',
	'C++',
	'C#',
	'MySQL',
	'SQL Server',
	'Oracle',
	'MongoDB',
	'Android',
	'iOS',
	'Unity 3D',
	'Cocos2d-x',
	'大数据',
	'云计算',
	'深度学习',
	'机器学习',
	'测试',
	'Linux',
	'Photoshop',
	'Maya',
	'Premiere',
	'ZBrush',
	'数据结构',
	'Ruby',
]

export default BackstageProblemItem
