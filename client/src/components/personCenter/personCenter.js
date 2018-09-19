import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import CustomIcon from '@/common/customIcon/customIcon'
import { changeAvatar, cancelAvatar, fetchUser } from '@/redux/actions'
import PersonCenterDynamic from '../personCenterDynamic/personCenterDynamic'
import PersonCenterInformation from '../personCenterInformation/personCenterInformation'
import PersonCenterArticle from '../personCenterArticle/personCenterArticle'
import personCenterClass from '../personCenterClass/personCenterClass'
import personCenterFocus from '../personCenterFocus/personCenterFocus'
import personCenterYuanwen from '../personCenterYuanwen/personCenterYuanwen'
import './personCenter.scss'
import { defaultAvatar, notSetText } from '@/const'
@connect((state) => state, { changeAvatar, cancelAvatar, fetchUser })
class PersonCener extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			confirmLoading: false,
			imgurl: defaultAvatar,
			UserId: this.props.match.params.id,
		}
	}
	componentDidMount = async () => {
		await this.props.fetchUser(this.state.UserId)
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}
	changAvatar = () => {
		var _this = this
		document.getElementById('avatar').addEventListener('change', function() {
			var avatar = document.getElementById('avatar').files[0]
			var bodyFormData = new FormData()
			bodyFormData.set('avatar', avatar)
			var reader = new FileReader()
			reader.readAsDataURL(avatar)
			reader.onload = function(e) {
				var txt = e.target.result
				_this.setState({
					imgurl: txt,
				})
			}
		})
	}
	handleOk = () => {
		this.setState({
			confirmLoading: true,
		})
		var avatar = document.getElementById('avatar').files[0]
		var bodyFormData = new FormData()
		bodyFormData.set('avatar', avatar)
		var _this = this
		axios({
			method: 'put',
			url: '/api/users/avatar',
			data: bodyFormData,
			headers: {
				'Content-Type': 'multipart/form-data',
				id: Cookies.get('_id'),
				token: Cookies.get('_token'),
			},
		})
			.then(function(res) {
				if (res.data.code === 1) {
					_this.props.changeAvatar(res.data.data)
				}
			})
			.catch(function(res) {
				console.log(res)
			})

		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			})
		}, 100)
	}
	handleCancel = () => {
		this.setState({
			visible: false,
			imgurl: '',
		})
	}
	render() {
		const { UserId } = this.state
		const { userstatus } = this.props
		const isOwn = UserId === Cookies.get('_id')
		const data = isOwn ? userstatus : userstatus.personCenterInfo
		const nav = [
			{
				name: '动态',
				icon: 'home',
				to: `/personCenter/${UserId}`,
				is: this.props.location.pathname === `/personCenter/${UserId}`,
				component: PersonCenterDynamic,
			},
			{
				name: '课程',
				icon: 'kecheng',
				to: `/personCenter/${UserId}/class`,
				is: this.props.location.pathname === `/personCenter/${UserId}/class`,
				component: personCenterClass,
			},
			{
				name: '个人信息',
				icon: 'gerenxinxi',
				to: `/personCenter/${UserId}/set`,
				is: this.props.location.pathname === `/personCenter/${UserId}/set`,
				component: PersonCenterInformation,
			},
			{
				name: '文章',
				icon: 'icon_article',
				to: `/personCenter/${UserId}/article`,
				is: this.props.location.pathname === `/personCenter/${UserId}/article`,
				component: PersonCenterArticle,
			},
			{
				name: '关注',
				icon: 'guanzhuxuanzhong',
				to: `/personCenter/${UserId}/focus`,
				is: this.props.location.pathname === `/personCenter/${UserId}/focus`,
				component: personCenterFocus,
			},
			{
				name: '问答',
				icon: 'wenti_icon',
				to: `/personCenter/${UserId}/yuanwen`,
				is: this.props.location.pathname === `/personCenter/${UserId}/yuanwen`,
				component: personCenterYuanwen,
			},
		]
		const personCenterNav = nav.map((v) => {
			return (
				<li key={v.to}>
					<NavLink exact activeClassName='active color' to={v.to}>
						<CustomIcon type={v.icon} className='my-icon' />
						<span>{v.name}</span>
					</NavLink>
				</li>
			)
		})
		return (
			<div className='personCenter-container'>
				<div className='header'>
					<div className='user-info'>
						<div className='user-pic'>
							<div className='user-pic-bg'>
								{isOwn ? <label onClick={this.showModal}>更换</label> : null}

								<img src={data.avatar ? `/avatar/${data.avatar}` : `${defaultAvatar}`} alt='' />
								<Modal
									title='更换头像'
									visible={this.state.visible}
									onOk={this.handleOk}
									confirmLoading={this.state.confirmLoading}
									onCancel={this.handleCancel}
									okText='确定'
									cancelText='取消'
								>
									<div className='change-avatar-container'>
										<input type='file' id='avatar' style={{ display: 'none' }} />
										<label htmlFor='avatar' onClick={this.changAvatar} />
										<img src={this.state.imgurl ? this.state.imgurl : `/avatar/${data.avatar}`} alt='' />
									</div>
								</Modal>
							</div>
						</div>
						<div className='user-info-right'>
							<h3 className='user-name'>{data.nickname ? data.nickname : data.username}</h3>
						</div>
						<div className='user-sign'>
							<p className='user-desc'>{data.signature ? data.signature : notSetText}</p>
						</div>
						<div className='study-info'>
							<div className='item follows'>
								<div className='u-info-learn' title='学习时长335小时18分'>
									<em>335h</em>
									<span>学习时长 </span>
								</div>
							</div>
							<div className='item follows'>
								<div className='u-info-learn' title='学习时长335小时18分'>
									<em>9953</em>
									<span>经验</span>
								</div>
							</div>
							<div className='item follows'>
								<div className='u-info-learn' title='学习时长335小时18分'>
									<em>{this.props.User ? parseInt(this.props.User.integral, 10) : 0}</em>
									<span>积分</span>
								</div>
							</div>
							<div className='item follows'>
								<div className='u-info-learn' title='学习时长335小时18分'>
									<em>{this.props.User.watchUsersId ? this.props.User.watchUsersId.length : 0}</em>
									<span>关注</span>
								</div>
							</div>
							<div className='item follows'>
								<div className='u-info-learn' title='学习时长335小时18分'>
									<em>{this.props.User.watchedUsersId ? this.props.User.watchedUsersId.length : 0}</em>
									<span>粉丝</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='wrap'>
					<div className='slider'>
						<ul>{personCenterNav}</ul>
					</div>
					<div className='u-container'>
						{nav.map((v) => {
							return v.is ? <v.component key={v.component} isOwn={isOwn} /> : null
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default PersonCener
