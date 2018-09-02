/**
 * 文章focus
 */
import React, { Component } from 'react'
import OpinionNav from '../opinionNav/opinionNav'
import OpinionSideBar from '../opinionSideBar/opinionSideBar'
import OpinionMainCenter from '../opinionMainCenter/opinionMainCenter'
import OpinionMainRight from '../opinionMainRight/opinionMainRight'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
@connect((state) => state, {})
export default class opinionFocus extends Component {
	constructor(props){
		super(props)
		this.state={
			articleArray:[]
		}
	}
	componentDidMount = () => {
		// 关注tag
		const watchTag = Cookies.get('tags')
		console.log(watchTag)
		if (watchTag&&watchTag.length!==0) {
			axios({
				method: 'put',
				url: `/api/users/watch/article-type/${watchTag}`,
				headers: {
					token: Cookies.get('_token')
				}
			}).then((res) => {
				// console.log(res)	
				
			})
		}

		setTimeout(() => {
			const token = Cookies.get('_token')
			axios({
				method: 'get',
				url: '/api/articles/watch-article-type',
				headers: {
					token: token
				}
			}).then((res) => {
				this.setState({
					articleArray:res.data.data
				})
			})
		}, 100)
		console.log(this.state.articleArray)
	}

	render() {
		return (
			<div className='opinion-container'>
				<OpinionNav />
				<div className='opinionMain-container'>
					<OpinionSideBar />
					<OpinionMainCenter articleArray={this.state.articleArray}/>
					<OpinionMainRight />
				</div>
			</div>
		)
	}
}
