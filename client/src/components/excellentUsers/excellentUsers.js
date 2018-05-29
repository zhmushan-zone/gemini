import React from 'react'

import './excellentUsers.scss'

class ExcellentUsers extends React.Component {
  render () {
    const designation = ['经验第一人', '经验第二人', '经验第三人']
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
        <div className="excellent-user-item">
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