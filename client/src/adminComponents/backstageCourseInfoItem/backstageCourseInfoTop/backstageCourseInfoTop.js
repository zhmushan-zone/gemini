import React, { Component } from 'react'
import { Row, Col } from 'antd'

import './backstageCourseInfoTop.scss'

class BackstageCourseInfoTop extends Component {
  render() {
    const { coverImg, title, authorUsername, createAt, sections, desc, direction, difficulty, type, price } = this.props.course
    return (
      <div className="backstage-course-info-top">
        <div className="backstage-course-info-top-left">
          <img src={`/cover-img/${coverImg}`} alt=""/>
        </div>
        <div className="backstage-course-info-top-right">
          <h1>
            {title}
          </h1>
          <div className="backstage-course-info-data">
            <div className="backstage-course-info-data-left">
              <Row>
                <Col span={12}>
                  创建人: <span>{authorUsername}</span>
                </Col>
                <Col span={12}>
                  课程难度: <span>{difficulties[difficulty]}</span>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  创建时间: <span>{createAt}</span>
                </Col>
                <Col span={12}>
                  课程方向: <span>{directions[direction]}</span>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  课程章节数: <span>{sections.length}</span>
                </Col>
                <Col span={12}>
                  课程分类: <span>{Array.from(type, x => types2[x]).join(",")}</span>
                </Col>
              </Row>
            </div>
            <div className="backstage-course-info-data-right">
              <Row>
                <Col span={12}>
                  <div className="backstage-course-info-data-right-title">状态</div>
                  <div className="backstage-course-info-data-right-state" style={{color: 'rgb(95, 207, 154)'}}>已上线</div>
                </Col>
                <Col span={12}>
                  <div className="backstage-course-info-data-right-title">所需积分</div>
                  <div className="backstage-course-info-data-right-state">{price}</div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const difficulties = [
  '基础',
  '中级',
  '进阶'
]

const directions = ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&测试', 'UI设计']

const types = [
  ['HTML5', 'CSS3', 'Javascript', 'Jquery', 'Node.js', 'Bootstrap', 'Sass/Less', 'Vue', 'React', 'Angular'],
  ['PHP', 'Java', 'SpringBoot', 'Python', 'C', 'C++', 'Go', 'C#', 'Ruby'],
  ['Android', 'IOS', 'Unity 3D', ' Cocos2d-x'],
  ['MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  ['大数据', '云计算'],
  ['测试', 'linux'],
  ['动效动画', 'APPUI设计', '设计工具', '设计基础']
]

const types2 = types.join().split(',')

export default BackstageCourseInfoTop