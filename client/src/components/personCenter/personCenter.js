import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import CustomIcon from '@/common/customIcon/customIcon'
import { changeAvatar, cancelAvatar } from '@/redux/actions'
import PersonCenterDynamic from '../personCenterDynamic/personCenterDynamic'
import PersonCenterInformation from '../personCenterInformation/personCenterInformation'
import PersonCenterArticle from '../personCenterArticle/personCenterArticle'
import personCenterClass from '../personCenterClass/personCenterClass'
import personCenterFocus from '../personCenterFocus/personCenterFocus'
import personCenterUpload from '../personCenterUpload/personCenterUpload'
import './personCenter.scss'
@connect(
  state => state,
  { changeAvatar, cancelAvatar }
)

class PersonCener extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
      imgurl: 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  changAvatar = () => {
    var _this = this
    document.getElementById("avatar").addEventListener("change", function () {
      var avatar = document.getElementById("avatar").files[0]
      var bodyFormData = new FormData()
      bodyFormData.set('avatar', avatar)
      var reader = new FileReader()
      reader.readAsDataURL(avatar)
      reader.onload = function (e) {
        var txt = e.target.result
        _this.setState({
          imgurl: txt
        })
      }
    })
  }
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    })
    var avatar = document.getElementById("avatar").files[0]
    var bodyFormData = new FormData()
    bodyFormData.set('avatar', avatar)
    var _this = this
    axios({
      method: 'post',
      url: '/api/users/avatar',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        "id": Cookies.get('_id'),
        "token": Cookies.get('_token'),
      },
    })
      .then(function (res) {
        console.log(res)
        if (res.data.code === 1) {
          _this.props.changeAvatar(res.data.data)
        }
      })
      .catch(function (res) {
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
      imgurl: ''
    })
  }
  render() {
    const nav = [
      {
        name: '动态',
        icon: 'home',
        to: '/personCenter',
        is: this.props.location.pathname === '/personCenter',
        component: PersonCenterDynamic
      },
      {
        name: '课程',
        icon: 'kecheng',
        to: '/personCenter/class',
        is: this.props.location.pathname === '/personCenter/class',
        component: personCenterClass
      },
      {
        name: '个人信息',
        icon: 'gerenxinxi',
        to: '/personCenter/set',
        is: this.props.location.pathname === '/personCenter/set',
        component: PersonCenterInformation
      },
      {
        name: '文章',
        icon: 'icon_article',
        to: '/personCenter/article',
        is: this.props.location.pathname === '/personCenter/article',
        component: PersonCenterArticle
      },
      {
        name: '关注',
        icon: 'guanzhuxuanzhong',
        to: '/personCenter/focus',
        is: this.props.location.pathname === '/personCenter/focus',
        component: personCenterFocus
      },
      {
        name: '视频',
        icon: 'shangchuan',
        to: '/personCenter/myvideo',
        is: this.props.location.pathname === '/personCenter/myvideo',
        component: personCenterUpload
      }

    ]
    const personCenterNav = nav.map(v => {
      return (
        <li key={v.to}>
          <NavLink exact activeClassName="active color" to={v.to}>
            <CustomIcon type={v.icon} className="my-icon"></CustomIcon>
            <span>{v.name}</span>
          </NavLink>
        </li>
      )
    })
    return (
      <div className="personCenter-container">
        <div className="header">
          <div className="user-info">
            <div className="user-pic">
              <div className="user-pic-bg">
                <label onClick={this.showModal}>更换</label>
                <img src={this.props.userstatus.avatar ? `/api/users/avatar/${this.props.userstatus.avatar}` : 'http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg'} alt="" />
                <Modal title="更换头像"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  confirmLoading={this.state.confirmLoading}
                  onCancel={this.handleCancel}
                  okText="确定"
                  cancelText="取消"
                >
                  <div className="change-avatar-container">
                    <input type="file" id="avatar" style={{ 'display': 'none' }} />
                    <label htmlFor="avatar" onClick={this.changAvatar}></label>
                    <img src={this.state.imgurl ? this.state.imgurl : `/api/users/avatar/${this.props.userstatus.avatar}`} alt="" />
                  </div>
                </Modal>
              </div>
            </div>
            <div className="user-info-right">
              <h3 className="user-name">{this.props.userstatus.nickname ? this.props.userstatus.nickname : this.props.userstatus.username}</h3>
            </div>
            <div className="user-sign">
              <p className="user-desc">{this.props.userstatus.signature ? this.props.userstatus.signature : "未设置"}</p>
            </div>ModalText
            <div className="study-info">
              <div className="item follows">
                <div className="u-info-learn" title="学习时长335小时18分">
                  <em>335h</em>
                  <span>学习时长 </span>
                </div>
              </div>
              <div className="item follows">
                <div className="u-info-learn" title="学习时长335小时18分">
                  <em>9953</em>
                  <span>经验</span>
                </div>
              </div>
              <div className="item follows">
                <div className="u-info-learn" title="学习时长335小时18分">
                  <em>１</em>
                  <span>积分</span>
                </div>
              </div>
              <div className="item follows">
                <div className="u-info-learn" title="学习时长335小时18分">
                  <em>１</em>
                  <span>关注</span>
                </div>
              </div>
              <div className="item follows">
                <div className="u-info-learn" title="学习时长335小时18分">
                  <em>０</em>
                  <span>粉丝</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="slider">
            <ul>
              {personCenterNav}
            </ul>
          </div>
          <div className="u-container">
            {
              nav.map(v => {
                return v.is ? <v.component key={v.component} /> : null
              })
            }
          </div>
        </div>
      </div>
    )
  }
}



export default PersonCener
