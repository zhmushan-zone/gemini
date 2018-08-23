import React, { Component } from 'react'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import { ArticleType } from '@/const'
import './FetchArticleList.scss'
export default class FetchArticleList extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		var articleData = this.props.articleData
		return (
			<React.Fragment>
				{articleData ? (
					articleData.map((v, i) => {
						const type = []
						v.type.map((v) => {
							type.push(ArticleType[v])
						})
						return (
							<OpinionMainCenterList
								key={v.createAt}
								title={v.title}
								direction={type[0]}
								see={'188'}
								author={v.authorUsername}
								time={v.createAt}
								tag={type}
								coverImg={`/cover-img/${v.coverImg}`}
								articleId={v.id}
							/>
						)
					})
				) : (
					''
				)}
			</React.Fragment>
		)
	}
}
