import React, { Component } from 'react'
import BackstageProblemModal from '../../backstageModal/backstageProblemModal/backstageProblemModal'
import { Table, Divider, Tag, Modal, message } from 'antd'
import { connect } from 'react-redux'
import { getProblemList } from '@/redux/actions'
import { ArticleType as Type } from '@/const'
import { dateSortByCreate } from '@/util/dateSort'
import axios from 'axios'
import Cookies from 'js-cookie'

const confirm = Modal.confirm

@connect(
  state => state.problem,
  { getProblemList }
)
class BackstageCheckProblemTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userName: '',
      userAvatar: '',
      title: '',
      content: ''
    }
  }
  
  componentDidMount() {
    this.props.getProblemList()
  }

  showModal = (item) => {
    this.setState({
      userName: item.author,
      userAvatar: item.avatar,
      title: item.title,
      content: item.content,
      visible: true,
    })
  }
  
  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  agree (id) {
    const _token = Cookies.get('_token')
    confirm({
      title: '请确认您的操作',
      content: '您是否要批准该条请求，请您确认',
      onOk() {
        return axios({
          method: 'put',
          url: `/api/issues/${id}/status/1`,
          headers: {
            token: _token
          }
        }).then(function(res) {
          if (res.data.code === 1) {
            message.success('请求已批准')
          }
        })
      },
      onCancel() {},
    })
  }

  disagree() {

  }
  
  render() {
    const columns = [{
      title: '标题',
      key: 'title',
      dataIndex: 'title',
    }, {
      
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      render: text => <a>{text}</a>,
    }, {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
    }, {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{Type[tag]}</Tag>)}
        </span>
      )
    }, {
      title: '内容',
      key: 'details',
      dataIndex: 'details',
      render: (text, record) => (
        <span>
          <a onClick={() => this.showModal(record)}>详情</a>
        </span>
      )
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a style={{color: '#5fcf9a'}} onClick={() => this.agree(record.id)}>批准</a>
          <Divider type="vertical" />
          <a style={{color: 'rgba(240, 20, 20, 0.8)'}}>拒绝</a>
        </span>
      ),
    }]
    
    const data = []
    console.log(this.props.problem)
    if (this.props.problem) {
      const problems = this.props.problem.filter(item => item.status === 0)
      dateSortByCreate(problems)
      problems.map((item, index) => {
        const problemData = {}
        problemData.key = `${index + 1}`
        problemData.author = item.authorUsername
        problemData.title = item.title
        problemData.type = '答疑'
        problemData.tags = item.tags
        problemData.content = item.content
        problemData.avatar = item.authorAvatar
        problemData.id = item.id
        data.push(problemData)
      })
    }

    return (
      <React.Fragment>
        <Table columns={columns} dataSource={data.length ? data : null} style={{marginTop: 30}} />
        <BackstageProblemModal 
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          userName={this.state.userName}
          userAvatar={this.state.userAvatar}
          title={this.state.title}
          content={this.state.content}
        />
      </React.Fragment>
    )
  }
}

export default BackstageCheckProblemTable