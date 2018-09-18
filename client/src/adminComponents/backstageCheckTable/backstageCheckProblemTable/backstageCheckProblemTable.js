import React, { Component } from 'react'
import BackstageProblemModal from '../../backstageModal/backstageProblemModal/backstageProblemModal'
import { Table, Divider, Tag, Modal, message, Input } from 'antd'
import { connect } from 'react-redux'
import { getProblemList, problemAccept, deleteProblem } from '@/redux/actions'
import { ArticleType as Type } from '@/const'
import { dateSortByCreate } from '@/util/dateSort'
import axios from 'axios'
<<<<<<< HEAD
import Cookies from 'js-cookie'

=======
>>>>>>> a7382d8d46406e5073108f9cd1d2c92d8373330f
const confirm = Modal.confirm
const { TextArea } = Input

@connect(
  state => state.problem,
  { getProblemList, problemAccept, deleteProblem }
)
class BackstageCheckProblemTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userName: '',
      userAvatar: '',
      title: '',
      content: '',
      disagreeReason: ''
    }
  }
  
  async componentDidMount() {
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

  agree (id, authorId) {
    console.log(authorId)
    confirm({
      title: '请确认您的操作',
      content: '您是否要批准该条请求，请您确认',
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          const _token = Cookies.get('_token')
          await this.props.problemAccept(id)
          await axios({
            method: 'post',
            url: '/api/notices',
            headers: {
              token: _token
            },
            data: {
              type: 3,
              reason: '',
              srcId: id,
              to: authorId
            }
          })
          resolve(1)
        }).then(res => {
          message.success('该请求已通过')
        })
      },
      onCancel() {},
    })
  }

  disagree(id, authorId) {
    confirm({
      title: '您确定要拒绝该请求吗',
      content: <TextArea placeholder="请输入拒绝的原因" autosize onChange={(e) => this.setState({disagreeReason: e.target.value})} />,
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          const _token = Cookies.get('_token')
          await this.props.deleteProblem(id)
          await axios({
            method: 'post',
            url: '/api/notices',
            headers: {
              token: _token
            },
            data: {
              type: 4,
              reason: this.state.disagreeReason,
              srcId: id,
              to: authorId
            }
          })
          resolve(1)
        }).then(res => {
          message.success('该请求已被拒绝')
        })
      },
      onCancel() {},
    })
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
          <a style={{color: '#5fcf9a'}} onClick={() => this.agree(record.id, record.authorId)}>批准</a>
          <Divider type="vertical" />
          <a style={{color: 'rgba(240, 20, 20, 0.8)'}} onClick={() => this.disagree(record.id, record.authorId)}>拒绝</a>
        </span>
      ),
    }]
    
    const data = []
    if (this.props.problem) {
      const problems = this.props.problem.filter(item => item.status === 0)
      dateSortByCreate(problems)
      problems.map((item, index) => {
        const problemData = {}
        problemData.key = `${index + 1}`
        problemData.author = item.authorUsername
        problemData.authorId = item.authorId
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