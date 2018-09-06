import React, { Component } from 'react'
import { Tag, Icon } from 'antd'
import Marked from 'marked'
import { ArticleType, defaultAvatar, ArticleCategoryAll } from '@/const.js'
import './backstateArticleItem.scss'
export default class backstateArticleItem extends Component {
	render() {
		const { authorName, authorAvatar, title, type, content, category, createTime, viewNum } = this.props
		return (
			<div className='backstage-article-item'>
				<h2>{ArticleCategoryAll[category]}</h2>
				<h4>
					<a onClick={this.showModal}>{title}</a>
				</h4>
				<div className='backstage-article-item-tags'>
					{type.map((item, index) => {
						return <Tag key={index}>{ArticleType[item]}</Tag>
					})}
				</div>
				<div className='backstage-article-item-content' dangerouslySetInnerHTML={{ __html: Marked(content) }} />
				<div className='backstage-article-item-authorInfo'>
					<img src={authorAvatar ? `/avatar/${authorAvatar}` : defaultAvatar} alt='' />
					<a style={{ marginLeft: 10 }}>{authorName}</a>
					<span>发布于</span>
					<span style={{ color: 'rgba(0, 0, 0, .25)' }}>{createTime}</span>
				</div>
				<div className='backstage-article-item-data'>
					<ul>
						<li>
							<Icon type='eye' />
							<span>{viewNum}</span>
						</li>
						<em />
					</ul>
				</div>
			</div>
		)
	}
}
