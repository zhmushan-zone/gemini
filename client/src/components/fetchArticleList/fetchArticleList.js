import React, { Component } from 'react'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import { ArticleType ,ArticleCategory} from '@/const'
import './FetchArticleList.scss'
import { withRouter } from 'react-router'
@withRouter
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
								category={ArticleCategory[v.category]}
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
					'暂无这个分类的文章'
				)}
			</React.Fragment>
		)
	}
}
