import React from 'react'
import { Tabs, Button } from 'antd'
import './personCenterArticle.scss'
const TabPane = Tabs.TabPane
const operations = <Button size="large">写文章</Button>
class PersonCenterArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  callback = (key) => {
    console.log(key)
  }
  render() {
    const { isOwn } = this.props
    return (
      <div className="person-center-article">
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large" tabBarExtraContent={operations}>
          <TabPane tab={isOwn?"我的文章":"他的文章"} key="1">
            <p className="notattend">你还没有任何原创文章，快去<a>发表文章</a>吧</p>
          </TabPane>
          <TabPane tab={isOwn?"我的喜欢":"他的喜欢"} key="3">
            <p className="notattend">你还没有任何推荐，可以先去<a>看看文章</a></p>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default PersonCenterArticle
