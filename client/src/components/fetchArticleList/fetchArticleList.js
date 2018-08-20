import React, { Component } from 'react'
import OpinionMainCenterList from '../opinionMainCenterList/opinionMainCenterList'
import { withRouter } from 'react-router-dom'
import './FetchArticleList.scss'
@withRouter
export default class FetchArticleList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			component: ''
		}
	}
	componentWillMount() {
		const pathname = this.props.location.pathname
		const virtual = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
		switch (pathname) {
			case '/opinion':
				var ToShow = virtual.map((v) => {
					return (
						<OpinionMainCenterList
							key={v}
							title={'我是推荐'}
							direction={'前端开发'}
							see={'188'}
							author={'张士大夫'}
							time={'8-12'}
							tag={[ '前端', '后端' ]}
						/>
					)
				})
				break
			default:
				break
		}
		this.setState({
			component:ToShow
		})
	}
	render() {
		return <React.Fragment>{this.state.component}</React.Fragment>
	}
}
