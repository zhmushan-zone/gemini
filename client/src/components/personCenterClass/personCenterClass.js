import React from 'react'
import { Tabs } from 'antd'
import './personCenterClass.scss'
const TabPane = Tabs.TabPane
class PersonCenterClass extends React.Component {
  componentDidMount() {
    
  }
  callback = (key) => {
    console.log(key)
  }
  render() {
    return (
      <div className="person-center-class-container">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="最近学习" key="1" >
            <div className="study-tl">
              <div className="tl-item">
                <div className="time">
                  <b>2018</b>
                  <em>5月25日</em>
                </div>
                <div className="course-list">
                  <ul>
                    <li className="course-one">
                      <div className="course-list-img">
                        <a href="">
                          <img src={require('@/assets/imgs/test-course.jpg')} alt="" />
                        </a>
                      </div>
                      <div className="course-list-cont">
                        <h3 className="study-hd">
                          Storm基础入门
                          <span className="i-new">更新完毕</span>
                          {/* 收藏和删除 */}
                          <div className="share-box">
                            <div className="show-btn"></div>
                          </div>
                        </h3>
                        <div className="study-points">
                          <span className="i-left">已学4%</span>
                          <span className="i-mid">用时11分</span>
                          <span className="i-right">学习至１－７操作数据库</span>
                        </div>
                        <div className="catog-points">
                          <span className="i-left span-common">
                            <a>笔记<i>0</i></a>
                          </span>
                          <span className="i-right span-common">
                            <a>问答<i>0</i></a>
                          </span>
                          <a className="btn-red continute-btn">继续学习</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default PersonCenterClass
