import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Modal, message } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import { Checkbox } from 'antd'
import defaultAvatar from '@/const'
import { connect } from 'react-redux'
import { deleteShoppingCartCourse } from '@/redux/actions'

import './shoppingCartItem.scss'

const confirm = Modal.confirm

@connect(
  null,
  { deleteShoppingCartCourse }
)
class ShoppingCartItem extends Component {
  onChange = (e) => {
    if (e.target.checked) {
      const newSelectList = [...this.props.selectList]
      newSelectList.push(this.props.index)
      this.props.stateChange('selectList', newSelectList)
    } else {
      const newSelectList = [...this.props.selectList]
      newSelectList.splice(newSelectList.indexOf(this.props.index), 1)
      this.props.stateChange('selectList', newSelectList)
    }
  }
  
  delete () {
    confirm({
      title: '课程移除',
      content: '您确定要在购物车中移除该课程',
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          const newCourse = [...this.props.courses]
          console.log(newCourse)
          newCourse.splice(this.props.index, 1)
          console.log(newCourse)
          await this.props.deleteShoppingCartCourse(newCourse)
          resolve('移除成功')
        }).then(res => {
          message.success(res)
        })
      },
      onCancel() {},
    })
  }
  
  render() {
    const { id, coverImg, title, price, selectList, index } = this.props
    return (
      <div className="shopping-cart-item">
        <div className="shopping-cart-item-check-btn">
          <Checkbox checked={selectList.includes(index)} onChange={this.onChange}></Checkbox>
        </div>
        <div className="shopping-cart-item-content">
          <div className="shopping-cart-item-content-left">
            <img src={coverImg ? `/cover-img/${coverImg}` : defaultAvatar} alt=""/>
          </div>
          <div className="shopping-cart-item-content-right">
            <h3>
              <Link to={`/class/${id}`}>
                {title}
              </Link>
            </h3>
          </div>
        </div>
        <div className="shopping-cart-item-price">
          <CustomIcon type="jifen" /><span style={{marginLeft: 10, lineHeight: '20px'}}>{price}</span>
        </div>
        <div className="shopping-cart-item-delete">
          <a onClick={() => this.delete()}>
            <Icon type="close" theme="outlined" />
          </a>
        </div>
      </div>
    )
  }
}

export default ShoppingCartItem