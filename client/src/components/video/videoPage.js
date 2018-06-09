import React, { Component } from 'react'
import { Modal } from 'antd'
import { DefaultPlayer as Video } from 'react-html5video'
import CustomIcon from '@/common/customIcon/customIcon'
import VideoHeader from '../videoHeader/videoHeader'
import VideoContent from '../videoPageContent/videoPageContent'
import videoChapterList from '../videoChapterList/videoChapterList'
import Footer from '../footer/footer'
import 'react-html5video/dist/styles.css'
import './videoPage.scss'
export default class VideoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      videoChapterList: false
    }
    this.openCourseSider = this.openCourseSider.bind(this)
    this.closeCourseSider = this.closeCourseSider.bind(this)
    this.chapterList = this.chapterList.bind(this)
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }
  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }
  componentDidMount() {
    document.querySelector('.video').parentNode.style.flex='1'
  }
  comment() {
    console.log('object')
  }
  openCourseSider(e) {
    this.setState({
      show: true
    })
  }
  closeCourseSider(e) {
    this.setState({
      show: false
    })
  }
  chapterList() {
    this.setState({
      videoChapterList: !this.state.videoChapterList
    })
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.state
    return (
      <React.Fragment>
        <VideoHeader courseName="课程介绍" />
        {/* 评论 */}
        <Modal title="我要评论"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="发表评论"
          cancelText="取消"
        >
          <p>{ModalText}</p>
        </Modal>
        <div className="video-page-container">
          <div className="course-sidebar-layout">
            {/* 章节信息 */}
            <videoChapterList className={`video-chapter-list-container ${this.state.videoChapterList ? 'active' : ''}`} />
            <dl>
              <dd className="openchapter" onClick={this.chapterList}>
                <CustomIcon type="zhangjiekecheng" size={24} color="white" />
                <span>章节</span>
              </dd>
              <dd>
                <CustomIcon type="wendaguanli" size={24} color="white" />
                <span>问答</span>
              </dd>
              <dd>
                <CustomIcon type="biji" size={24} color="white" />
                <span>笔记</span>
              </dd>
              <dd onClick={this.showModal}>
                <CustomIcon type="pinglun" size={24} color="white" />
                <span>评论</span>
              </dd>
            </dl>
          </div>
          <Video autoPlay loop muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster=""
            className="video"
            onCanPlayThrough={() => {
              // Do stuff
            }}>
            <source src={`/api/videos/${this.props.match.params.id}`} type="video/webm" />
          </Video>
          <div className={`video-panel course-sidebar-layout ${this.state.show ? 'none' : ''}`} onClick={this.openCourseSider} >
            <CustomIcon type="icon-arrow-left4" size={24} color="white" />
          </div>
          <div className={` teacher-msg ${this.state.show ? '' : 'none'}`} style={{ width: 550 }} >
            <div className="panel-container">
              <span onClick={this.closeCourseSider}>
                <CustomIcon type='x' color="white" size={24} className="delete" />
              </span>
              <div className="v-teachers">
                <a href="" className="v-teachers-img">
                  <img src="http://img5.duitang.com/uploads/item/201506/07/20150607110911_kY5cP.jpeg" alt="" />
                </a>
                <dl>
                  <dd className="v-t-nickname">LGD_Sunday</dd>
                  <dd className="v-t-title">移动开发工程师</dd>
                </dl>
              </div>
              <p className="v-teachers-info">5年前端、移动端开发经验，在JS、Android、iOS领域有独特的见解，统筹过的多个项目用户数已过千万，目前就职于济南某国企，并且成立了个人工作室。</p>
            </div>
          </div>
        </div>
        <VideoContent />
        <Footer />
      </React.Fragment>
    )
  }
}
// 5b17d27bc8eff3b610c9323c
