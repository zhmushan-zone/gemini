import React, { Component } from 'react'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import { withRouter } from 'react-router-dom'
import {ArticleType} from '@/const'

import './FetchArticleList.scss'
@withRouter
export default class FetchArticleList extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentWillMount() {
		const pathname = this.props.location.pathname
		switch (pathname) {
			case '/opinion':
				break
			default:
				break
		}
	}
	render() {
		if(this.props.articleData){
			var articleData = this.props.articleData
			console.log(articleData)
		}
		return (
			<React.Fragment>
				{articleData?articleData.map((v,i) => {
					const type = []
					v.type.map(v=>{
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
				}):""}
			</React.Fragment>
		)
	}
}
