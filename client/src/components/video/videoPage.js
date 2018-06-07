import React, { Component } from 'react'
import { DefaultPlayer as Video } from 'react-html5video'
import CustomIcon from '@/common/customIcon/customIcon'
import VideoHeader from '../videoHeader/videoHeader'
import VideoContent from '../videoPageContent/videoPageContent'
import Footer from '../footer/footer'
import 'react-html5video/dist/styles.css'
import './videoPage.scss'
export default class VideoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {

  }
  render() {
    return (
      <React.Fragment>
        <VideoHeader courseName="课程介绍" />
        <div className="video-page-container">
          <div className="course-sidebar-layout">
            <dl>
              <dd className="openchapter">
                <CustomIcon type="zhangjiekecheng" size={24} color="white" />
                <span>章节</span>
              </dd>
              <dd>
                <CustomIcon type="wendaguanli"  size={24} color="white" />
                <span>问答</span>
              </dd>
              <dd>
                <CustomIcon type="biji"  size={24} color="white" />
                <span>笔记</span>
              </dd>
              <dd>
                <CustomIcon type="pinglun"  size={24} color="white" />
                <span>评论</span>
              </dd>
            </dl>
          </div>
          <Video autoPlay loop muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster="http://sourceposter.jpg"
            className="video"
            onCanPlayThrough={() => {
              // Do stuff
            }}>
            <source src={`/api/videos/${this.props.match.params.id}`} type="video/webm" />
          </Video>
          <div className="video-panel course-sidebar-layout">
            <CustomIcon type="icon-arrow-left4" size={24} color="white" />
          </div>
        </div>
        <VideoContent />
        <Footer />
      </React.Fragment>
    )
  }
}
// 5b17d27bc8eff3b610c9323c
