import React from 'react'
import UserStatus from './userStatus/userStatus'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import { withRouter, NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { fetchMessage } from '@/redux/actions'
import Cookies from 'js-cookie'

import './nav.scss'

@withRouter
@connect((state) => state.message, { fetchMessage })
class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			searchContent: '',
			shoppingCartCount: 0,
			isHaveUnRead: false,
		}
		this.stateChange = this.stateChange.bind(this)
	}

	stateChange(key, value) {
		this.setState({
			[key]: value,
		})
	}

	async componentDidMount() {
		const { pathname } = this.props.location
		if (pathname === '/onlineStudying') {
			this.setState({
				selected: 1,
			})
		} else if (pathname === '/forum') {
			this.setState({
				selected: 2,
			})
		} else if (pathname === '/opinion') {
			this.setState({
				selected: 3,
			})
		} else if (pathname === '/opinion/focus') {
			this.setState({
				selected: 3,
			})
		} else if (pathname.split('/')[1] === 'class') {
			this.setState({
				selected: 1,
			})
		} else if (pathname.split('/')[1] === 'article') {
			this.setState({
				selected: 3,
			})
		} else if (pathname.split('/')[1] === 'excellentSeven') {
			this.setState({
				selected: 3,
			})
		} else if (pathname.split('/')[1] === 'excellentThirty') {
			this.setState({
				selected: 3,
			})
		}
		await this.props.fetchMessage()
		this.props.msg.map((item) => {
			if (item.isRead === false) {
				return this.setState({
					isHaveUnRead: true,
				})
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.msg !== this.props.msg) {
			nextProps.msg.map((item) => {
				if (item.isRead === false) {
					return this.setState({
						isHaveUnRead: true,
					})
				}
			})
			return this.setState({
				isHaveUnRead: false,
			})
		}
	}

	navSectionClick(e) {
		const navActiveBG = document.querySelector('.navActiveBG')
		if (navActiveBG) {
			const target = e.target

			this.setState({
				selected: parseInt(target.getAttribute('data-identify'), 10),
			})

			const dataIdentify = target.getAttribute('data-identify')
			navActiveBG.style.transform = `translateX(${dataIdentify}00%)`
		}
	}

	search() {
		if (this.state.searchContent) {
			this.props.history.push(`/search/${this.state.searchContent}`)
		}
	}

	render() {
		var is = this.props.location.pathname.split('/')[1] === 'personCenter'
		const personCenterNavBgColor = classnames({
			personCenterNavBgColor: is,
		})
		console.log(this.props.location.pathname)
		const navList = [ '首页', '在线学习', '答疑', '看法' ]
		const navRoute = [ '/home', '/onlineStudying', '/forum', '/opinion' ]
		const navSections = navList.map((section, index) => {
			if (index === this.state.selected) {
				return (
					<li key={index}>
						<NavLink
							className={is ? '' : 'selected'}
							style={is ? { color: 'white' } : null}
							to={navRoute[index]}
							onClick={(e) => this.navSectionClick(e)}
							data-identify={index}
						>
							{section}
						</NavLink>
					</li>
				)
			} else {
				return (
					<li key={index}>
						<NavLink
							to={navRoute[index]}
							style={is ? { color: 'white' } : null}
							onClick={(e) => this.navSectionClick(e)}
							data-identify={index}
						>
							{section}
						</NavLink>
					</li>
				)
			}
		})
		return (
			<nav style={is ? { boxShadow: 'none' } : null} className='allNav'>
				<div className='nav-left'>
					<div className='nav-logo'>
						<img src={require(`@/assets/imgs/logo.png`)} alt='' />
					</div>
					<div className='nav-sections'>
						<ul>{navSections}</ul>
						{is ? null : (
							<span
								style={{ transform: `translateX(${this.state.selected}00%)` }}
								className={`navActiveBG ${personCenterNavBgColor}`}
							/>
						)}
					</div>
				</div>
				<div className='nav-operation'>
					<div className='nav-search-wrapper'>
						<div className='nav-search'>
							<input type='text' onChange={(e) => this.setState({ searchContent: e.target.value })} />
							<span>
								<a onClick={() => this.search()}>
									<Icon type='search' theme='outlined' />
								</a>
							</span>
						</div>
					</div>
					{
						Cookies.get('_token') ? 
						<React.Fragment>
							<div className='nav-shopping-cart-wrapper' style={{ paddingTop: 12 }}>
								<Link to={`/shoppingCart`} className='nav-shopping-cart'>
									<Icon type='shopping-cart' theme='outlined' />
									<span style={{ marginLeft: 10 }}>购物车</span>
									{this.state.shoppingCartCount ? (
										<span className='nav-shopping-cart-count'>{this.state.shoppingCartCount}</span>
									) : null}
								</Link>
							</div>
							<div className='nav-message-center-wrapper'>
								<Link to={'/messageCenter'} className='nav-message-center'>
									<Icon type='bell' theme='filled' />
									{this.state.isHaveUnRead ? <span className='new-message-alert' /> : null}
								</Link>
							</div>
						</React.Fragment> : null
					}
					{!is ? <UserStatus stateChange={this.stateChange} /> : null}
				</div>
			</nav>
		)
	}
}

export default Nav
