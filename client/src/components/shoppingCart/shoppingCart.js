import React, { Component } from 'react'
import { Checkbox, Modal, message } from 'antd'
import CustomIcon from '@/common/customIcon/customIcon'
import ShoppingCartItem from '../shoppingCartItem/shoppingCartItem'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getShoppingCart, deleteShoppingCartCourse, updateMyCourse, updateUserShoppingCart } from '@/redux/actions'
import Loading from '@/common/loading/loading'
import axios from 'axios'
import Cookies from 'js-cookie'

import './shoppingCart.scss'

const confirm = Modal.confirm

@connect(
  state => state,
  { getShoppingCart, deleteShoppingCartCourse, updateMyCourse, updateUserShoppingCart }
)
class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectList: [],
      loading: true,
      isPurchaseOk: false
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  async componentDidMount() {
    await this.props.getShoppingCart()
    this.setState({
      loading: false
    })
  }

  stateChange(key, value) {
    this.setState({
      [key]: value
    })

  }
  
  onChange = (e) => {
    if (e.target.checked) {
      const newSelectList = Array.from({ length: this.props.shoppingCart.courses.length }, (v, i) => i)
      this.setState({
        selectList: newSelectList
      })
    } else {
      this.setState({
        selectList: []
      })
    }
  }

  purchase () {
    if (this.state.selectList.length === 0) {
      return message.warning('请先选择要购买的课程')
    }
    confirm({
      title: '购买确认',
      content: '购买相应课程成功后将会扣除对应的积分，您是否要继续？',
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          const _token = Cookies.get('_token')
          let newCourses = [...this.props.shoppingCart.courses]
          const purchaseList = [...this.state.selectList]
          const ids = []
          newCourses = newCourses.filter((item, index) => {
            return !purchaseList.includes(index)
          })
          for (let item of this.state.selectList) {
            ids.push(this.props.shoppingCart.courses[item].id)
          }
          const res = await axios({
            method: 'put',
            url: `/api/courses/join`,
            headers: {
              token: _token
            },
            data: ids
          })
          if (res.data.code === 1) {
            await this.props.deleteShoppingCartCourse(newCourses)
            await this.props.updateUserShoppingCart(newCourses)
            this.props.updateMyCourse([...ids, ...this.props.userstatus.joinCourse])
            resolve('购买成功')
            
          }
        }).then(res => {
          message.success(res)
          this.setState({
            selectList: [],
            isPurchaseOk: true
          })
        })
      },
      onCancel() {},
    })
  }
  
  render() {
    const myIntegral = this.props.userstatus.integral
    let totalPrice = 0
    if(this.props.shoppingCart.courses.length) {
      for (let item of this.state.selectList) {
        totalPrice += this.props.shoppingCart.courses[item].price
      }
    }
    return (
      <div className="shopping-cart">
        <div className="shopping-cart-top">
          {
            this.state.isPurchaseOk ?
            null
            :
            <div className="shopping-cart-title">
              <div className="shopping-cart-title-name">
                我的购物车  
              </div>
              <div className="shopping-cart-title-data">
                共{this.props.shoppingCart.courses.length}门，已选择{this.state.selectList.length}门
              </div>
            </div>
          }
        </div>
        <div className="shopping-cart-content">
          <div className="shopping-cart-info">
            {
              this.state.isPurchaseOk ?
              <React.Fragment>
                <p className="purchase-ok-content">
                  <CustomIcon size="30" color="#98cd6b" type="zhifuchenggong" />
                  <span style={{marginLeft: 20}}>支付成功，扣除积分100</span>
                </p>
                <div className="go-to-my-class">
                  <Link to={`/personCenter/${this.props.userstatus.id}/class`}>
                    前往我的课程查看
                  </Link>
                </div>
              </React.Fragment>
              :
              (
                <React.Fragment>
                  { this.state.loading ? 
                    <Loading style={{marginTop: 200}} /> :
                    (
                      this.props.shoppingCart.courses.length ?
                      <React.Fragment>
                        <div className="shopping-cart-info-top">
                          <div className="shopping-cart-info-top-check-btn">
                            <Checkbox checked={this.props.shoppingCart.courses.length === this.state.selectList.length} onChange={this.onChange}>全选</Checkbox>
                          </div>
                          <div className="shopping-cart-info-top-check-content">
                            课程
                          </div>
                          <div className="shopping-cart-info-top-price">
                            积分
                          </div>
                          <div className="shopping-cart-info-top-action">
                            操作
                          </div>
                        </div>
                        <div className="shopping-cart-info-content">
                          {
                            this.props.shoppingCart.courses.map(((item, index) => {
                              return <ShoppingCartItem
                                        id={item.id}
                                        index={index}
                                        coverImg={item.coverImg}
                                        price={item.price}
                                        title={item.title}
                                        stateChange={this.stateChange}
                                        selectList={this.state.selectList}
                                        courses={this.props.shoppingCart.courses}
                                        key={item.id}
                                      />
                            }))
                          }
                        </div>
                        <div className="shopping-cart-info-operation">
                          <div className="shopping-cart-info-total-price">
                            <div className="shopping-cart-info-total-price-title">
                              总计金额：
                            </div>
                            <div className="shopping-cart-info-total-price-data">
                              <CustomIcon type="jifen" /><span style={{marginLeft: 10, lineHeight: '20px'}}>{totalPrice}</span>
                            </div>
                          </div>
                          {
                            myIntegral >= totalPrice ?
                            <a className="shopping-cart-info-purchase-btn" onClick={() => this.purchase()}>
                              购买
                            </a> :
                            <a className="shopping-cart-info-purchase-btn" style={{background: '#555'}}>
                              余额不足(我的积分:{myIntegral})
                            </a>
                          }
                        </div>
                      </React.Fragment> :
                      <p className="shopping-cart-info-alert">购物车内空空如也</p>
                    )
                  }
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart