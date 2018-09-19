import React from 'react'

import './excellentUsers.scss'

class ExcellentUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '该用户已成仙',
      experience: '9999',
      x: '',
      y: '',
      windowDisplay: 'none'
    }
  }
  
  excellentUsersHoverIn (e) {
    this.setState({
      x: e.target.offsetLeft - 94,
      y: e.target.offsetTop - 120,
      windowDisplay: 'block'
    })
  }

  excellentUsersHoverOut (e) {
    this.setState({
      x: e.currentTarget.offsetLeft - 80,
      y: e.currentTarget.offsetTop - 120,
      windowDisplay: 'none'
    })
  }

  render () {
    const designation = ['回答问题最多', '获取积分最多', '发表文章最多']
    const topThreeItems = users.slice(0, 3).map((item, index) => {
      return (
        <div className="top-three-item" key={index}>
          <a href="#javascript">
            <img src={require(`@/assets/imgs/${item.img}.jpg`)} alt=""/> 
          </a>
          <p className="top-three-name">{item.name}</p>
          <p className="top-three-designation">{designation[index]}</p>
        </div>
      )
    })
    const excellentUserItems = users.slice(3).map((item, index) => {
      return (
        <div className="excellent-user-item" 
            onMouseEnter={(e) => {this.excellentUsersHoverIn(e)}} 
            onMouseLeave={(e) => {this.excellentUsersHoverOut(e)}} 
            key={index}>
          <a href="#javascript">
            <img src={require(`@/assets/imgs/${item.img}.jpg`)} alt=""/>
          </a>
        </div>
      )
    } )
    return (
      <div className="excellent-users">
        <h3>优秀用户</h3>
        <div className="top-three">
          {topThreeItems}
        </div>
        <div className="excellent-users-wrapper">
          {excellentUserItems}
          <div className="excellent-user-info-window"
            style={{left: this.state.x, top: this.state.y, display: this.state.windowDisplay}}>
            <div style={{fontSize: 16}}>{this.state.name}</div>
            <div style={{fontSize: 12}}>积分{this.state.experience}</div>
          </div>
        </div>
      </div>
    )
  }
}

// 测试数据
const users = [
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '4999' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' },
  { name: '该用户已成仙', img: 'user-avator', experience: '5000' },
  { name: 'shoukailiang', img: 'shou', experience: '5000' }
]

export default ExcellentUsers