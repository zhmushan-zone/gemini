import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProblemList } from '@/redux/actions'
import { Input } from 'antd'
import { dateSortByCreate } from '@/util/dateSort'
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
      showType: Array.from({length: allTags.length}, (v, i) => i)
    }
    this.stateChange = this.stateChange.bind(this)
  }
  
  async componentDidMount() {
    await this.props.getProblemList()
  }
  
  
  stateChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  isSimilar (arr1, arr2) {
    arr1 = Array.from(arr1, x => x + 1)
    return new Set([...arr1, ...arr2]).size < arr1.length + arr2.length
  }
  
  render() {
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
    let problems = []
    this.props.problem ?
    problems = dateSortByCreate([...this.props.problem].filter(item => this.isSimilar(item.tags, this.state.showType)))
    : null
    console.log(problems)
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
            problems.length ? 
            problems.map(item => {
              return <BackstageProblemItem
                        authorName={item.authorUsername}
                        authorAvatar={item.authorAvatar}
                        title={item.title}
                        tags={item.tags}
                        content={item.content}
                        createTime={item.createAt}
                        viewNum={item.viewnum}
                        followNum={item.watchersId.length}
                        replyNum={item.replysId.length}
                        key={item.id}
                      />
            }) : <p style={{color: 'rgba(0,0,0,.45)', textAlign: 'center'}}>暂无数据</p>
          }
        </div>
      </div>
    )
  }
}

const allTags = ['全部' ,'JavaScript', 'Node.js', 'Vue', 'React','Html5', 'Html/CSS', 'Angular', 'WebApp', 'Jquery', 'Bootstrap', '前端工具', 'CSS3', 'Sass/Less', 'JAVA', 'Python', 'Go', 'PHP', 'C', 'C++', 'C#', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Android', 'iOS', 'Unity 3D', 'Cocos2d-x', '大数据', '云计算', '深度学习', '机器学习', '测试', 'Linux', 'Photoshop', 'Maya', 'Premiere', 'ZBrush', '数据结构', 'Ruby']

export default BackstageProblemList