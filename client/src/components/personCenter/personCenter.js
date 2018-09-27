import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal, Input, message, Icon } from 'antd'
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
const { TextArea } = Input
@connect((state) => state, { changeAvatar, cancelAvatar, fetchUser })
class PersonCener extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			visible2: false,
			visible3: false,
			confirmLoading: false,
			imgurl: defaultAvatar,
			UserId: this.props.match.params.id,
			adviceContent: '',
		}
	}
	componentDidMount = async () => {
		await this.props.fetchUser(this.state.UserId)
		if (this.props.User.avatar) {
			this.setState({
				imgurl: '',
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.id !== this.props.match.params.id) {
			this.props.fetchUser(nextProps.match.params.id)
		}
		this.setState({
			UserId: nextProps.match.params.id,
		})
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	showModal2 = () => {
		this.setState({
			visible2: true,
			adviceContent: '',
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
				imgurl: '',
			})
		}, 500)
	}
	handleCancel = () => {
		this.setState({
			visible: false,
			imgurl: '',
		})
	}

	handleOk2 = async (e) => {
		if (!this.state.adviceContent) {
			return message.warning('您的建议不能为空')
		}
		const _token = Cookies.get('_token')
		axios({
			method: 'post',
			url: '/api/suggestions',
			headers: {
				token: _token,
			},
			data: {
				msg: this.state.adviceContent,
			},
		}).then((res) => {
			if (res.data.code === 1) {
				this.setState({
					adviceContent: '',
				})
				message.success('发送成功，感谢您的反馈')
			}
		})
		this.setState({
			visible2: false,
		})
	}

	handleCancel2 = (e) => {
		this.setState({
			visible2: false,
		})
	}

	showModal3 = () => {
    this.setState({
      visible3: true,
    })
  }

  handleCancel3 = (e) => {
    this.setState({
      visible3: false,
    })
  }

	
	render() {
		const { UserId } = this.state
		const { userstatus, User } = this.props
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
				is: this.props.location.pathname === `/personCenter/${UserId}/class` && isOwn,
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
				name: '看法',
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
									className='person-center-modal'
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
						<div className='message-information'>
							<div className='user-info-right'>
								<h3 className='user-name'>{data.nickname ? data.nickname : data.username}</h3>
							</div>
							<div className='user-sign'>
								<p className='user-desc'>{data.signature ? data.signature : notSetText}</p>
							</div>
						</div>
						<div className='study-info'>
							<div className='item follows'>
								<div className='u-info-learn'>
									<em>{this.props.User.integral ? parseInt(this.props.User.integral, 10) : 0}</em>
									<span>
										积分
										<a style={{color: '#fff', fontSize: 16}} onClick={this.showModal3}>
											<Icon type="question-circle" theme="outlined" />
										</a>
									</span>
								</div>
							</div>
							<div className='item follows'>
								<div className='u-info-learn'>
									<em>{this.props.User.watchUsersId ? this.props.User.watchUsersId.length : 0}</em>
									<span>关注</span>
								</div>
							</div>
							<div className='item follows'>
								<div className='u-info-learn'>
									<em>{this.props.User.watchedUsersId ? this.props.User.watchedUsersId.length : 0}</em>
									<span>粉丝</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='wrap'>
					<div className='slider'>
						<ul>
							{personCenterNav}
							<li>
								<a onClick={() => this.showModal2()}>
									<CustomIcon type='fankui' className='my-icon' />
									<span>意见反馈</span>
								</a>
							</li>
						</ul>
					</div>
					<div className='u-container'>
						{this.props.User.watchedUsersId ? (
							nav.map((v) => {
								return v.is ? (
									<v.component
										key={v.component}
										isOwn={isOwn}
										watchedUsersId={this.props.User.watchedUsersId}
										watchUsersId={this.props.User.watchUsersId}
									/>
								) : null
							})
						) : null}
					</div>
				</div>
				<Modal
					className='person-center-modal'
					title='意见反馈'
					visible={this.state.visible2}
					onOk={this.handleOk2}
					onCancel={this.handleCancel2}
					destroyOnClose={true}
					okText='确认'
					cancelText='取消'
				>
					<TextArea
						rows={4}
						placeholder='请输入您的意见，我们一定虚心采纳'
						onChange={(e) => this.setState({ adviceContent: e.target.value })}
					/>
				</Modal>
				<Modal
          title="积分规则"
          visible={this.state.visible3}
					onCancel={this.handleCancel3}
					footer={null}
        >
					<h5>课程:</h5>
          <p>
						1、当对一门课程完成评分并评价时，加5积分。
					</p>
					<p>
						2、当你在某门课程下的回复收到别人赞同时，每10个赞同加2积分。
					</p>
					<h5>答疑:</h5>
					<p>
						1、为防止用户刷分，每发起一个问题，会扣除用户5积分。
					</p>
					<p>
						2、当你认真回答别人的问题后，会获得3积分的奖励，当你的回答收获赞同时，每10个赞同会增加2积分
					</p>
					<p>
						3、为了鼓励用户积极回答，答疑区设有排行榜，当每周和每月结算时，榜上有名的用户会获得不等的大量积分的奖励。
					</p>
					<h5>看法:</h5>
					<p>
						1、当你发布的文章通过官方审核后，会奖励你20积分
					</p>
					<p>
						2、当你的文章收获赞同后，每10个赞同会奖励你4积分
					</p>
					<p>
						3、与答疑类似，文章区也会有排行奖励。
					</p>
        </Modal>
			</div>
		)
	}
}

export default PersonCener
