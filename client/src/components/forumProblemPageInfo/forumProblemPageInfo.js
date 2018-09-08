import React, { Component } from 'react'
import Icon from '@/common/customIcon/customIcon'
import ForumProblemPageReply from '../forumProblemPageReply/forumProblemPageReply'
import { Modal, Radio,  Row, Col, message } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser, followProblem } from '@/redux/actions'
import Cookies from 'js-cookie'
import axios from 'axios'
import { defaultAvatar } from '@/const'
import Share from '@/share'

import './forumProblemPageInfo.scss'

const RadioGroup = Radio.Group

@withRouter
@connect(
  state => state,
  { fetchUser, followProblem }
)
class ForumProblemPageInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      authorInfo: {
        username: '',
        avatar: ''
      },
      isFollow: false,
      followNum: 0,
      reportType: null,
      reportContent: ''
    }
  }
  
  async componentDidMount() {
    const _id = Cookies.get('_id')
    this.setState({
      followNum: this.props.currentProblem.watchersId.length
    })
    if (this.props.currentProblem.watchersId.indexOf(_id) !== -1) {
      this.setState({
        isFollow: true
      })
    }
    await this.props.fetchUser(this.props.currentProblem.authorId)
    this.setState({
      authorInfo: {
        username: this.props.User.username,
        avatar: this.props.User.avatar
      }
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = async (e) => {
    if (this.state.reportType === null) {
      return message.warning('请选择举报类型')
    }
    this.setState({
      visible: false,
    })
    const _token = Cookies.get('_token')
    const res = await axios({
      method: 'post',
      url: '/api/reports',
      headers: {
        token: _token
      },
      data: {
        srcId: this.props.currentProblem.id,
        type: 0,
        msg: this.state.reportContent,
        reason: this.state.reportType
      }
    })
    if (res.data.code === 1) {
      return message.success('举报成功')
    } else {
      return message.error('举报失败')
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }
  
  onChange = (e) => {
    this.setState({
      reportType: e.target.value
    })
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.paramId !== this.props.paramId) {
      const _id = Cookies.get('_id')
      this.setState({
        followNum: nextProps.currentProblem.watchersId.length
      })
      console.log(nextProps)
      if (nextProps.currentProblem.watchersId.indexOf(_id) !== -1) {
        this.setState({
          isFollow: true
        })
      } else {
        this.setState({
          isFollow: false
        })
      }
      const res = await axios({
        method: 'get',
        url: `/api/users/${nextProps.currentProblem.authorId}`
      })
      this.setState({
        authorInfo: {
          username: res.data.data.username,
          avatar: res.data.data.avatar
        }
      })
    }
  }

  follow() {
    let newFollowNum = this.state.isFollow ?
      this.state.followNum - 1 :
      this.state.followNum + 1
    this.props.followProblem(this.props.currentProblem.id)
    this.setState({
      isFollow: !this.state.isFollow,
      followNum: newFollowNum
    })
  }

  render() {
    const { currentProblem } = this.props
    const { authorInfo } = this.state
    return (
      <div className="forum-problem-page-info">
        <h1>{currentProblem.title}</h1>
        <div className="forum-problem-details">
          <a className="forum-problem-details-user">
            <img src={authorInfo.avatar ? `/avatar/${authorInfo.avatar}` : defaultAvatar} alt=""/>
            <span>{authorInfo.username}</span>
          </a>
          <div className="forum-problem-details-data">
            <a onClick={this.showModal}>举报</a>
            <span>回答{currentProblem.replysId.length}</span>
            <span>浏览{currentProblem.viewnum}</span>
          </div>
        </div>
        <div className="forum-problem-page-desc" dangerouslySetInnerHTML = {{__html: currentProblem.content}}>
        </div>
        <div className="forum-problem-page-type-operation">
          <div className="forum-problem-page-type">
            {
              currentProblem.tags.map(item => {
                return <Link to={`/forum/type/${item}`} key={item}>
                  {allTags[item]}
                </Link>
              })
            }
          </div>
          <div className="forum-problem-page-operation">
            <div className="forum-problem-page-share">
              <a onClick={() => Share.shareToQQZone(currentProblem.title, `/forum/details/${currentProblem.id}/`)}>
                <Icon type="qq" color="#b6b9bc" size={26} />
              </a>
              <a onClick={() => Share.shareToDouban(currentProblem.title, `/forum/details/${currentProblem.id}/`)}>
                <Icon type="douban_F" color="#b6b9bc" size={24} />
              </a>
              <a onClick={() => Share.shareToWeibo(currentProblem.title, `/forum/details/${currentProblem.id}/`)}>
                <Icon type="weibo" color="#b6b9bc" size={24} />
              </a>
            </div>
            <div className="forum-problem-page-follow">
              <a onClick={() => this.follow()}>
                  {
                    this.state.isFollow ?
                    <Icon type="xin1" color="#e45d54" size={24} /> :
                    <Icon type="xin" color="#b6b9bc" size={24} />
                  }
              </a>
              <span>{this.state.followNum}</span>
            </div>
          </div>
        </div>
        <ForumProblemPageReply />
        <Modal
          title="举报"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <button className="forum-page-report-btn" onClick={this.handleOk}>提交</button>
          ]}
        >
          <RadioGroup onChange={this.onChange} >
            <Row>
              <Col span={8}><Radio value={0}>广告或垃圾信息</Radio></Col>
              <Col span={8}><Radio value={1}>辱骂</Radio></Col>
              <Col span={8}><Radio value={2}>涉政或违法</Radio></Col>
              <Col span={8}><Radio value={3}>抄袭</Radio></Col>
              <Col span={8}><Radio value={4}>不合适内容</Radio></Col>
            </Row>
          </RadioGroup>
          <textarea className="forum-page-report-content" placeholder="写下举报理由(选填)" maxLength={150} onChange={(e) => this.setState({reportContent: e.target.value})}>
          </textarea>
          <span className="font-num-alert">{this.state.reportContent.length}/150</span>
        </Modal>
      </div>
    )
  }
}

const allTags = ['JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default ForumProblemPageInfo