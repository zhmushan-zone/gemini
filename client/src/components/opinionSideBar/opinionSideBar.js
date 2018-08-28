import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import './opinionSideBar.scss'
import { ArticleCategory } from '@/const.js'
@withRouter
export default class opinionSideBar extends Component {
	render() {
		const pathname = this.props.match.path
		return (
			<div className='side-bar-container'>
				<div className='left_menu'>
					{
						<a href='/opinion' className={`m_item ${pathname === '/opinion' ? 'active' : ''}`}>
							推荐
						</a>
					}
					{ArticleCategory.map((v, i) => {
						return (
							<NavLink to={`/opinion/${i}`} className='m_item' activeClassName='active' key={i}>
								{v}
							</NavLink>
						)
					})}
				</div>
			</div>
		)
	}
}
