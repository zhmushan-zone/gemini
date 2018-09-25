import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import './backstageMenu.scss'

const SubMenu = Menu.SubMenu
@withRouter
class BackstageMenu extends React.Component {

  render() {
    return (
      <Menu
        className="backstage-menu"
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={this.props.collapsed}
      >
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>网站分析</span>
          <Link to="/admin"></Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          <span >用户列表</span>
          <Link to="/admin/user"></Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="inbox" />
          <span>课程列表</span>
          <Link to="/admin/course"></Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="question-circle" />
          <span>问题列表</span>
          <Link to="/admin/problem"></Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="edit" />
          <span>文章列表</span>
          <Link to="/admin/article"></Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="calendar" />
          <span>审核中心</span>
          <Link to="/admin/check"></Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="safety" />
          <span>举报中心</span>
          <Link to="/admin/report"></Link>
        </Menu.Item>
        <Menu.Item key="8">
          <Icon type="safety" />
          <span>反馈中心</span>
          <Link to="/admin/advice"></Link>
        </Menu.Item>
        <SubMenu key="sub3" title={<span><Icon type="mail" /><span>结果页</span></span>}>
          <Menu.Item key="9">成功</Menu.Item>
          <Menu.Item key="10">失败</Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>异常页</span></span>}>
          <Menu.Item key="11">403</Menu.Item>
          <Menu.Item key="12">404</Menu.Item>
          <Menu.Item key="13">500</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default BackstageMenu