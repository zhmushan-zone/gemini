import React, { Component } from 'react'
import { Checkbox } from 'antd'

import './shoppingCart.scss'

const CheckboxGroup = Checkbox.Group
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    }
  }
  
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    })
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    })
  }
  
  render() {
    return (
      <div className="shopping-cart">
        <div className="shopping-cart-top">
          <div className="shopping-cart-title">
            <div className="shopping-cart-title-name">
              我的购物车  
            </div>
            <div className="shopping-cart-title-data">
              共1门，已选择1门
            </div>
          </div>
        </div>
        <div className="shopping-cart-content">
          <div className="shopping-cart-info">
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart