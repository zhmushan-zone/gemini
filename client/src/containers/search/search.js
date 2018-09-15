import React, { Component } from 'react'
import { Icon } from 'antd'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import SearchArticleItem from '../../components/searchItem/searchArticleItem/searchArticleItem'
import SearchCourseItem from '../../components/searchItem/searchCourseItem/searchCourseItem'
import SearchProblemItem from '../../components/searchItem/searchProblemItem/searchProblemitem'
import { connect } from 'react-redux'
import { search } from '@/redux/actions'

import './search.scss'

const TabPane = Tabs.TabPane

@connect(
  state => state.search,
  { search }
)
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchContent: ''
    }
  }
  
  componentDidMount() {
    this.props.search(this.props.match.params.content)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.content !== nextProps.match.params.content) {
      this.setState({
        searchContent: nextProps.match.params.content
      })
      this.props.search(nextProps.match.params.content)
    }
  }
  
  render() {
    console.log(this.props)
    const courses = [...this.props.courses]
    const problems = [...this.props.problems]
    const articles = [...this.props.articles]
    let courseItems, problemItems, articleItems
    articleItems = articles.length ? 
    articles.map(item => {
      return <SearchArticleItem
              articleId={item.id}
              title={item.title}
              content={item.content}
              coverImg={item.coverImg}
              userAvatar={item.authorAvatar}
              userName={item.authorUsername}
              createAt={item.createAt.split(' ')[0]}
              viewNum={item.viewnum}
              key={item.id}
            />
    }) : null
    courseItems = courses.length ? 
    courses.map(item => {
      return <SearchCourseItem
              courseId={item.id}
              title={item.title}
              content={item.content}
              coverImg={item.coverImg}
              authorName={item.authorUsername}
              authorAvatar={item.authorAvatar}
              difficulty={item.difficulty}
              desc={item.desc}
              joinersNum={item.joinersId.length}
              key={item.id}
            />
    }) : null
    problemItems = problems.length ?
    problems.map(item => {
      return <SearchProblemItem 
              problemId={item.id}
              title={item.title}
              tags={item.tags}
              replyNum={item.replysId.length}
              key={item.id}
            />
    }) : null
    const hotKey = ['React', 'Vue', 'Python', 'Angular', '算法', '大数据', '人工智能', '小程序']
    return (
      <div className="search">
        <div className="search-top">
          <div className="search-input-wrapper">
            <div className="search-icon">
              <Icon type="search" theme="outlined" />
            </div>
            <input type="text" placeholder="请输入你想搜素的内容" defaultValue={this.props.match.params.content} onChange={(e) => this.setState({searchContent: e.target.value})}/>
            <Link to={`/search/${this.state.searchContent}`} className="search-btn">
              搜索
            </Link>
          </div>
          <div className="hot-search-key">
            热搜关键字:
            {
              hotKey.map((item, index) => {
                return <a key={index}>{item}</a>
              })
            }
          </div>
        </div>
        <div className="search-wrapper">
          <div className="search-content">
            <Tabs defaultActiveKey="1">
              <TabPane tab="课程" key="1">
                {
                  courseItems ?
                  courseItems :
                  <p style={{textAlign: 'center', color: '#93999F',marginTop: 136, fontSize: 16}}>没有找到与"{this.state.searchContent}"相关的结果</p>
                }
              </TabPane>
              <TabPane tab="答疑" key="2">
              {
                problemItems ?
                problemItems : 
                <p style={{textAlign: 'center', color: '#93999F',marginTop: 136, fontSize: 16}}>没有找到与"{this.state.searchContent}"相关的结果</p>
              }
              </TabPane>
              <TabPane tab="看法" key="3">
                {
                  articleItems ?
                  articleItems :
                  <p style={{textAlign: 'center', color: '#93999F',marginTop: 136, fontSize: 16}}>没有找到与"{this.state.searchContent}"相关的结果</p>
                }
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default Search