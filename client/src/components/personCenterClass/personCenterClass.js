import React from 'react'
import { Tabs } from 'antd'
import './personCenterClass.scss'
const TabPane = Tabs.TabPane
class PersonCenterClass extends React.Component {
  callback = (key) => {
    console.log(key)
  }
  render() {
    return (
      <div className="person-center-class-container">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="最近学习" key="1">
            <div className="study-tl">
              <div className="tl-item">
                <div className="time">
                  <b>2018</b>
                  <em>5月25日</em>
                </div>
                <div className="course-list">
                  <ul>
                    <li className="course-one"></li>
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
