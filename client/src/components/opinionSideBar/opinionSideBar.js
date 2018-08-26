import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import './opinionSideBar.scss'
import { ArticleCategory } from '@/const.js'
@withRouter
export default class opinionSideBar extends Component {
	render() {
		return (
			<div className='side-bar-container'>
				<div className='left_menu'>
					{ArticleCategory.map((v, i) => {
						return (
							<NavLink  to={`/opinion/${i}`} className='m_item' activeClassName='active' key={i}>
								{v}
							</NavLink>
						)
					})}
				</div>
			</div>
		)
	}
}
