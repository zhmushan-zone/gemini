import React from 'react'
import Masonry from 'masonry-layout'
import CustomIcon from '@/common/customIcon/customIcon'
import axios from 'axios'
import Cookies from 'js-cookie'
import './wonderfulContent.scss'
import { connect } from 'react-redux'

@connect((state) => state, {})
class WonderfulContent extends React.Component {
	async componentDidMount() {
		const grid = document.querySelector('.masonry')
		const msnry = new Masonry(grid, {
			// options...
			itemSelector: '.grid-item',
			gutter: 18,
			isFitWidth: true,
			articleWeeklyId: [],
		})
		let res = await axios({
			method: 'GET',
			url: '/api/articles/up-weekly',
			headers: {
				token: Cookies.get('_token'),
			},
		})
		if (res.data.code === 1) {
			this.setState({
				articleWeeklyId: res.data.data,
			})
		}
	}
	render() {
		const periodTopics = period.map((item, index) => {
			return (
				<div className='home-period-topic' key={index}>
					<div className='home-period-topic-title'>
						# 【{item.series}】 #<br />
						{item.title}
					</div>
					<img src={item.img} alt='period-topic' />
				</div>
			)
		})

		const wonderfulArticles = articles.map((item, index) => {
			return (
				<div className='wonderful-article grid-item' key={index}>
					<label className='wonderful-article-label'>
						<CustomIcon type='article' size={16} />
						手记文章
					</label>
					<div className='wonderful-article-title'>
						<a href='#javascript'>{item.title}</a>
						<img src={item.img} alt='wonderful-article-cover' />
					</div>
					<p className='wonderful-article-content'>{item.content}</p>
					<div className='wonderful-article-bottom'>
						<div className='wonderful-article-data'>
							浏览<span>{item.viewerCoutent}</span>
							推荐<span>{item.recommendCount}</span>
						</div>
						<a href='#javascript'>阅读全文</a>
					</div>
				</div>
			)
		})

		return (
			<div className='wonderful-content'>
				<h3>优质精选</h3>
				<div className='masonry'>
					{/* <div className='home-hot-topic grid-item'>
						<label className='home-topic-label'>本期热门</label>
						<div className='this-period-topic-title'>
							<a href='#javascript'>
								#【内推第2波】#<br />
								打工奋斗7万落京户VS自主创业牧马城市，如何抉择？
							</a>
							<img src='//img.mukewang.com/5abc43e500012ec805120512.jpg' alt='this-period-topic&#39;' />
						</div>
						<p className='this-period-topic-content'>
							毕业求职？跳槽加薪？纠结滋润加班还是苦练x年自主创业？速速提问互撩，你在撩的极有可能就是你的Boss！激不激动？惊不惊喜？Offer已在这里！你的简历在哪里？Scott老师邮箱：wolf18387@qq.comJeson老师邮箱：jeson@imoocc.com
						</p>
						<div className='this-period-topic-details'>
							<a href='#javascript'>了解详情</a>
						</div>
						<h4>往期回顾</h4>
						{periodTopics}
						<div className='more-period-topics'>
							<a href='#javascript'>更多往期话题</a>
						</div>
					</div> */}
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
	{
		series: '花式填坑',
		title: '运维进化篇：成为Python DevOps工程师有哪些必备条件?',
		img: 'https://img.mukewang.com/5a5d55de00015cba05120512.jpg',
	},
]

const articles = [
	{
		title: '19校招阿里腾讯华为美团算法岗面经，均已拿offer | 掘金技术征文',
		content: `应邀请来参加技术征文。本人2019年毕业，目前2019秋招已结束，拿到了阿里巴巴，腾讯，美团，华为的机器学习算法工程师offer，来到这个网站与大家分享面经。
			先介绍一下楼主背景，985本+美国专排top15硕，有Amazon+Intel+美团的实习，现在秋招结束了，来回馈广大网友！美团AI算法提前批(已拿两提前批offer和一个转正offer)
		`,
		viewerCoutent: '951',
		recommendCount: '12',
		img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg',
	},
	{
		title: '作为前端你拿什么证明网站体验？',
		content:
			'前端重构程序员是一个关注代码同时还要留意体验的异类。代码的优化虽然难，但是有比较多的性能测试工具去证明优化的成果。然而体验这种东西，我们又要如何去证明它的好与坏呢？今天我着重会基于「webnovel」PC站点从以上两点给大家介绍，如何从体验的角度去做重构的优化，并如何用数据去证明你的优化是有效果的。',
		viewerCoutent: '951',
		recommendCount: '12',
		img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg',
	},
	{
		title: 'Flutter | 状态管理探索篇——Scoped Model（一）',
		content: `Flutter的很多灵感来自于React，它的设计思想是数据与视图分离，由数据映射渲染视图。所以在Flutter中，它的Widget是immutable的，而它的动态部分全部放到了状态(State)中。
			假如你曾进行过react开发，也许你一下会想到Redux。flutter有类似redux的状态管理的库吗？答案是肯定的，但是有关在flutter中使用redux的应用实践我们会在之后的文章中进行介绍。
			今天要和大家分享的是使用Scoped_model进行状态管理。
			`,
		viewerCoutent: '951',
		recommendCount: '12',
		img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg',
	},
	{
		title: 'React 官方发布性能分析插件Profiler',
		content:
			'React 16.5 新增了对开发工具（DevTools）性能分析插件（profiler plugin）的支持。该插件通过 React Profiler API（实验中）收集每个组件渲染的耗时，用于分析识别出 React 应用中的性能瓶颈。它与我们即将推出的 time slicing 和 suspense 这两个功能将完全兼容。',
		viewerCoutent: '951',
		recommendCount: '12',
		img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg',
	},
	{
		title: '如何为 Cloud TPU 编写自定义估算器模型',
		content:
			'张量处理单元 (TPU) 可加速处理 Google 内各种机器学习工作负载，并可供 Google Cloud 客户使用。您可以在 Cloud TPU 参考模型存储区找到启用 TPU 的顶尖图像模型版本，例如 ResNet 和 AmoebaNet；您还可以使用强大的 Tensor2Tensor 库，在 TPU 上执行文本摘要和问答任务。这些教程会为您分步介绍如何使用当下很多最热门的 Cloud TPU 参考模型。',
		viewerCoutent: '951',
		recommendCount: '12',
		img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg',
	},
	{
		title: '如何基于区块链技术开发应用',
		content:
			'随着区块链的火热，相信很多同学已经跃跃欲试想投入到区块链开发队伍当中来，可是又感觉无从下手，本文就基于以太坊平台，轻松带大家入区块链技术开发应用的大门。 以太坊是什么 我们要开发一个区块链应用，如果要从头开发一个区块链，是不现实的，这时我们就需要以太坊这样的平台。 以太坊（Ethereum）是一个建立在区块链技术之上的应用平台。它允许任何人在平台中建立和使用通过区块链技术运行的去中心化应用。 对这...',
		viewerCoutent: '951',
		recommendCount: '12',
		img: 'https://img.mukewang.com/5afba9300001878502560256-210-130.jpg',
	},
]

export default WonderfulContent
