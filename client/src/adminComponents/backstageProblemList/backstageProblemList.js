import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProblemList } from '@/redux/actions'
import { Input } from 'antd'
import BackstageTag from '../backstageTag/backstageTag'
import BackstageProblemItem from '../backstageProblemItem/backstageProblemItem'

import './backstageProblemList.scss'

const Search = Input.Search

@connect(
  state => state.problem,
  { getProblemList }
)
class BackstageProblemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showType: Array.from({length: allTags.length}, (v, i) => i),
      problems: []
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  async componentDidMount() {
    await this.props.getProblemList()
    this.setState({
      problems: this.props.problem
    })
  }
  
  
  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    console.log(this.state.problems)
    const tagItems = allTags.map((item, index) => {
      return <BackstageTag
                type={index}
                key={index}
                len={allTags.length}
                showType={this.state.showType}
                stateChange={this.stateChange}
              >
              {item}
            </BackstageTag>
    })
    return (
      <div className="backstage-problem-list">
        <div className="backstage-problem-list-top">
          <Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={value => console.log(value)}
          />
        </div>
        <div className="backstage-problem-type-check">
          <div className="backstage-problem-type-check-title" >
            所属类目:
          </div>
          <div className="backstage-problem-type-check-content" >
              {tagItems}
          </div>
        </div>
        <div className="backstage-problem-content">
          {
            this.state.problems.length ? 
            this.state.problems.map(item => {
              return <BackstageProblemItem
                        authorId={item.authorId}
                        title={item.title}
                        tags={item.tags}
                        content={item.content}
                        createTime={item.createAt}
                        viewNum={item.viewNum}
                        followNum={item.watchersId.length}
                        replyNum={item.replysId.length}
                        key={item.id}
                      />
            }) : null
          }
        </div>
      </div>
    )
  }
}

const allTags = ['全部' ,'JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default BackstageProblemList