import React, { Component } from 'react'
import './opinionFocusSelect.scss'
import { connect } from 'react-redux'
import { ArticleType } from '@/const.js'

@connect((state) => state, {})
export default class opinionFocusSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			see: false,
		}
	}
	handleFocus() {
		this.setState({
			see: !this.state.see,
		})
	}
	render() {
		const { watchTags } = this.props.userstatus
		return (
			<div className='opinion-focus-select'>
				<div className='see'>
					<span className='focus' onClick={this.handleFocus.bind(this)}>
						我关注的标签
					</span>
				</div>
				<div className={`tags ${this.state.see ? '' : 'zero'}`}>
					{watchTags ? (
						watchTags.map((v, i) => {
							return (
								<a className='watch-tags' key={i}>
									{ArticleType[v]}
								</a>
							)
						})
					) : (
						'你还没有关注标签'
					)}
				</div>
			</div>
		)
	}
}
