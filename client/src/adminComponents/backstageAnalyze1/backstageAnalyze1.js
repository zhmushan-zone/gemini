import React from 'react'
import { Card, Row, Col, Table } from 'antd'
import axios from 'axios'
import { View } from '@antv/data-set'
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts'
import { connect } from 'react-redux'
import Loading from '@/common/loading/loading'
import { hotSort } from '@/util/hotSort'
@connect((state) => state, {})
class BackstageAnalyze1 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filteredInfo: null,
			sortedInfo: null,
			articles: [],
			show: true,
		}
	}
	handleChange = (pagination, filters, sorter) => {
		this.setState({})
	}
	async componentDidMount() {
		let res = await axios({
			method: 'GET',
			url: '/api/articles',
		})
		if (res.data.code === 1) {
			await this.setState({
				articles: res.data.data,
				show: false,
			})
		}
	}
	render() {
		// 图标
		const articles = hotSort(this.state.articles)
		console.log(articles)
		const data = [
			{ item: '前端开发', count: 40 },
			{ item: '后端开发', count: 21 },
			{ item: '移动开发', count: 17 },
			{ item: '数据库', count: 13 },
			{ item: 'ui设计', count: 9 },
		]
		const data1 = [
			{
				key: '1',
				name: '前端开发1',
				user: 32,
				love: '10',
			},
		]
		articles.map((v) => {
			let obj = {
				key: v.id,
				name: v.title,
				user: v.authorUsername,
				love: v.upersId.length,
			}
			data1.push(obj)
		})
		const dv = new View()
		dv.source(data).transform({
			type: 'percent',
			field: 'count',
			dimension: 'item',
			as: 'percent',
		})
		const cols = {
			percent: {
				formatter: (val) => {
					val = val * 100 + '%'
					return val
				},
			},
		}
		//

		const columns = [
			{
				title: '文章',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '用户',
				dataIndex: 'user',
				key: 'user',
			},
			{
				title: '喜欢数',
				dataIndex: 'love',
				key: 'love',
			},
		]

		return (
			<div>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={12} lg={12}>
						<Card title='热门文章版本' bordered={false}>
							<Table columns={columns} dataSource={data1} onChange={this.handleChange} />
						</Card>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12}>
						<Card title='销售额类别占比' bordered={false}>
							<Chart height={500} data={dv} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
								<Coord type='theta' radius={0.75} />
								<Axis name='percent' />
								<Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
								<Tooltip
									showTitle={false}
									itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
								/>
								<Geom
									type='intervalStack'
									position='percent'
									color='item'
									tooltip={[
										'item*percent',
										(item, percent) => {
											percent = percent * 100 + '%'
											return {
												name: item,
												value: percent,
											}
										},
									]}
									style={{ lineWidth: 1, stroke: '#fff' }}
								>
									<Label
										content='percent'
										formatter={(val, item) => {
											return item.point.item + ': ' + val
										}}
									/>
								</Geom>
							</Chart>
						</Card>
					</Col>
				</Row>
				{this.state.show ? <Loading /> : null}
			</div>
		)
	}
}
export default BackstageAnalyze1
