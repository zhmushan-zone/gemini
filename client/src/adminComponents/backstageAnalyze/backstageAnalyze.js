import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'
import BackstageAnalyze1 from '../backstageAnalyze1/backstageAnalyze1'
import './backstageAnalyze.scss'
export default class backstageAnalyze extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    // 浏览
    const data = [
      { year: "0", value: 200 },
      { year: "2", value: 245 },
      { year: "4", value: 350 },
      { year: "6", value: 245 },
      { year: "8", value: 124 },
      { year: "10", value: 250 },
      { year: "12", value: 222 },
      { year: "14", value: 666 },
      { year: "16", value: 322 },
      { year: "18", value: 233 },
      { year: "20", value: 323 },
      { year: "22", value: 333 },
    ]

    const cols = {
      '人数': { min: 0 },
      '时间': { range: [0, 1] }
    }

    // 购买
    const data1 = [
      { year: '周一', sales: 38 },
      { year: '周二', sales: 52 },
      { year: '周三', sales: 61 },
      { year: '周四', sales: 80 },
      { year: '周五', sales: 48 },
      { year: '周六', sales: 38 },
      { year: '周七', sales: 38 },
    ]
    const cols1 = {
      'sales': { tickInterval: 20 },
    }


    return (
      <div className="analyze-container">
        <Row gutter={12}>
          <Col md={12} lg={6} >
            <Card title="" bordered={false} className="analyze-card" >
              <span>本周支付笔数</span>
              <p className="number">600</p>
              <Chart height={180} data={data1} scale={cols1} forceFit className="victors-number">
                <Axis name="year" />
                <Axis name="sales" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="interval" position="year*sales" />
              </Chart>
              <p className="number2">日支付笔数：20</p>
            </Card>
          </Col>
          <Col md={12} lg={6} >
            <Card title="" bordered={false} className="analyze-card" >
              <span>当日访问量</span>
              <p className="number">8812</p>
              <Chart height={180} data={data} scale={cols} forceFit className="victors-number">
                <Axis name="year" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="line" position="year*value" size={2} />
                <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1 }} />
              </Chart>
              <p className="number2">日访问量：200</p>
            </Card>
          </Col>
          <Col md={12} lg={6} >
            <Card title="" bordered={false} className="analyze-card" >
              <span>日均访问量</span>
              <p className="number">8812</p>
              <Chart height={180} data={data} scale={cols} forceFit className="victors-number">
                <Axis name="year" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="line" position="year*value" size={2} />
                <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1 }} />
              </Chart>
              <p className="number2">日访问量：200</p>
            </Card>
          </Col>
          <Col md={12} lg={6} >
            <Card title="" bordered={false} className="analyze-card" style={{ paddingBottom: -20 }}>
              <span>日均访问量</span>
              <p className="number">8812</p>
              <Chart height={180} data={data} scale={cols} forceFit className="victors-number">
                <Axis name="year" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: "y" }} />
                <Geom type="line" position="year*value" size={2} />
                <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1 }} />
              </Chart>
              <p className="number2">日访问量：200</p>
            </Card>
          </Col>
        </Row>
        <BackstageAnalyze1/>
      </div>

    )
  }
}
