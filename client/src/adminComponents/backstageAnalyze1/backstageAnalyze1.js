import React from 'react'
import { Card, Row, Col } from 'antd'
class BackstageAnalyze1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} >
            <Card title="Card title" bordered={false} >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card title="Card title" bordered={false}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}
export default BackstageAnalyze1  