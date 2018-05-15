import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CustomIcon from '@/common/customIcon/customIcon'
import './personCenter.scss'
@connect(
  state => state
)
class PersonCener extends React.Component {

  render() {
    const nav = [
      {
        name: '动态',
        icon: 'home',
        to: '/personCenter'
      },
      {
        name: '课程',
        icon: 'kecheng',
        to: '/personCenter/class'
      },
      {
        name: '个人信息',
        icon: 'gerenxinxi',
        to: '/personCenter/set'
      },
      {
        name: '文章',
        icon: 'icon_article',
        to: '/personCenter/article'
      }

    ]
    const personCenterNav = nav.map(v => {
      return (
        <li key={v.to}>
          <NavLink exact activeClassName="active color" to={v.to}>
            <CustomIcon type={v.icon}></CustomIcon>
            <span>{v.name}</span>
          </NavLink>
        </li>
      )
    })
    const { username } = this.props.userstatus
    return (
      <div className="personCenter-container">
        <div className="header">
          <div className="user-info">
            <div className="user-pic">
              <div className="user-pic-bg">
                <img src={require('@/assets/imgs/user-avator.jpg')} alt="" />
              </div>
            </div>
            <div className="user-info-right">
              <h3 className="user-name">{username}</h3>
            </div>
            <div className="user-sign">
              <p className="user-desc">这位同学很懒，木有签名的说～</p>
            </div>
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

          </div>
        </div>
      </div>
    )
  }
}
export default PersonCener
