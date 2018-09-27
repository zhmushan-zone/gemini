import React, { Component } from 'react'
import BackstageTag from '../backstageTag/backstageTag'
import { Table, Modal, Divider, message } from 'antd'
import { connect } from 'react-redux'
import { fetchAdvice, updateAdvice } from '@/redux/actions'
import axios from 'axios'
import Cookies from 'js-cookie'
import { dateSortByCreate } from '@/util/dateSort'

import './backstageAdvice.scss'

const confirm = Modal.confirm

@connect(
  state => state.advice,
  { fetchAdvice, updateAdvice }
)
class BackstageAdvice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showType: Array.from({length: options.length}, (v, i) => i),
      visible: false,
      confirmLoading: false,
      adviceContent: '',
      currentAdvice: ''
    }
    this.stateChange = this.stateChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchAdvice()
  }
  
  stateChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  
  showModal = (record) => {
    this.setState({
      visible: true,
      adviceContent: record.content,
      currentAdvice: record.key
    })
  }

  handleOk = async (e) => {
    const _token = Cookies.get('_token')
    this.setState({
      confirmLoading: true
    })
    const res = await axios({
      method: 'put',
      url: `/api/suggestions/${this.state.currentAdvice}/read`,
      headers: {
        token: _token
      }
    })
    if (res.data.code === 1) {
      let newData = [...this.props.advice]
      for (let item of newData) {
        if (item.id === this.state.currentAdvice) {
          item.isRead = true
        }
      }
      await this.props.updateAdvice(newData)
      this.setState({
        visible: false,
        confirmLoading: false,
        currentAdvice: ''
      })
      message.success('设置成功')
    }
  }

  delete(record) {
    confirm({
      title: '操作确认',
      content: '您是否确认要删除这条记录？',
      onOk: async () => {
        const _token = Cookies.get('_token')
        const res = await axios({
          method: 'delete',
          url: `/api/suggestions/${record.key}`,
          headers: {
            token: _token
          }
        })
        if (res.data.code === 1) {
          let newData = [...this.props.advice]
          newData = newData.filter(item => item.id !== record.key)
          await this.props.updateAdvice(newData)
          message.success('删除成功')
        }
      },
      onCancel() {
      },
    })
  }
  
  handleCancel = (e) => {
    this.setState({
      visible: false,
      currentAdvice: ''
    })
  }

  render() {
    const columns = [{
      title: '建议者',
      dataIndex: 'user',
      key: 'user',
      render: text => <a>{text}</a>,
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => (
        <span>
          {text.split(' ')[0]}
        </span>
      )
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span style={{color: record.isRead ? 'rgb(95, 207, 154)' : 'rgb(240, 20, 20)'}}>{record.isRead ? '已读' : '未读'}</span>
    }, {
      title: 'action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.showModal(record)}>阅读 {record.name}</a>
          <Divider type="vertical" />
          <a onClick={() => this.delete(record)}>Delete</a>
        </span>
      )
    }]
    let data = []
    if (this.props.advice.length) {
      for (let item of this.props.advice) {
        const advice = {}
        advice.key = item.id
        advice.user = '该用户已成仙'
        advice.time = item.createAt
        advice.content = item.msg
        advice.isRead = item.isRead
        data.push(advice)
      }
    }
    if (this.state.showType.length !== 3) {
      data = data.filter((item) => item.isRead === Boolean(this.state.showType[0])) 
    }
    data.reverse()
    return (
      <div className="backstage-advice">
        <div className="backstage-advice-tag-wrapper">
          <div className="backstage-advice-tag-title" >
            所属类目:
          </div>
          <div className="backstage-advice-tag-container">
            {
              options.map((item, index) => {
                return <BackstageTag
                        type={index}
                        key={index}
                        len={options.length}
                        showType={this.state.showType}
                        stateChange={this.stateChange}
                      >
                        {item}
                      </BackstageTag>
              })
            }
          </div>
        </div>
        <Table dataSource={data.length ? data : null} columns={columns} />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          okText="设为已读"
          cancelText="取消"
        >
          {this.state.adviceContent}
        </Modal>
      </div>
    )
  }
}

const options = ['全部', '已读', '未读']

export default BackstageAdvice