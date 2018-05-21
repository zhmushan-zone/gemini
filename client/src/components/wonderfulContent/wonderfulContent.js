import React from 'react'
import Masonry from 'masonry-layout'
import CustomIcon from '@/common/customIcon/customIcon'

import './wonderfulContent.scss'

class WonderfulContent extends React.Component {
  render () {
    const periodTopics = period.map((item, index) => {
      return (
        <div className="home-period-topic" key={index}>
          <div className="home-period-topic-title">
            # 【{item.series}】 #<br/>
            {item.title}
          </div>
          <img src={item.img} alt="period-topic"/>
        </div>
      )
    })
    
    const wonderfulArticles = articles.map((item, index) => {
      return (
        <div className="wonderful-article" key={index}>
          <label className="wonderful-article-label">
            <CustomIcon type="article" size={16} />
            手记文章
          </label>
          <div className="wonderful-article-title">
            <a href="#javascript">{item.title}</a>
            <img src={item.img} alt="wonderful-article-cover"/>
          </div>
          <p className="wonderful-article-content">
            {item.content}
          </p>
          <div className="wonderful-article-bottom">
            <div className="wonderful-article-data">
              浏览<span>{item.viewerCoutent}</span>
              推荐<span>{item.recommendCount}</span>
            </div>
            <a href="#javascript">阅读全文</a>
          </div>
        </div>
      )
    })

    return (
      <div className="wonderful-content">
        <h3>优质精选</h3>
        <div className="masonry">
          <div className="home-hot-topic">
            <label className="home-topic-label">
              本期热门
            </label>
            <div className="this-period-topic-title">
              <a href="#javascript">
                #【内推第2波】#<br/>
                打工奋斗7万落京户VS自主创业牧马城市，如何抉择？
              </a>
              <img src="//img.mukewang.com/5abc43e500012ec805120512.jpg" alt="this-period-topic'"/>
            </div>
            <p className="this-period-topic-content">
              毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com
            </p>
            <div className="this-period-topic-details">
              <a href="#javascript">了解详情</a>
            </div>
            <h4>
              往期回顾
            </h4>
            {periodTopics}
            <div className="more-period-topics">
              <a href="#javascript">更多往期话题</a>
            </div>
          </div>
          {wonderfulArticles}
        </div>
      </div>
    )
  }
}
// 用于测试
const period = [
  { series: '获奖名单戳查看更多', title: ' 当我们谈论Java时，我们都谈些什么?', img: 'https://img.mukewang.com/5abaf07b00016b7005120512.jpg' },
  { series: '内推第一波', title: '直击BAT面试机会！行业大佬在线答疑', img: 'https://img.mukewang.com/5aaf11ae0001d26c05120512.jpg' },
  { series: '花式填坑', title: '运维进化篇：成为Python DevOps工程师有哪些必备条件?', img: 'https://img.mukewang.com/5a5d55de00015cba05120512.jpg' }
]

const articles = [
  { title: '如何基于区块链技术开发应用', content: '随着区块链的火热，相信很多同学已经跃跃欲试想投入到区块链开发队伍当中来，可是又感觉无从下手，本文就基于以太坊平台，轻松带大家入区块链技术开发应用的大门。 以太坊是什么 我们要开发一个区块链应用，如果要从头开发一个区块链，是不现实的，这时我们就需要以太坊这样的平台。 以太坊（Ethereum）是一个建立在区块链技术之上的应用平台。它允许任何人在平台中建立和使用通过区块链技术运行的去中心化应用。 对这...', viewerCoutent: '951', recommendCount: '12', img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg' }
]

export default WonderfulContent