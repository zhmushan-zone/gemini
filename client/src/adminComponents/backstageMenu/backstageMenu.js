import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import './backstageMenu.scss'

const SubMenu = Menu.SubMenu
@withRouter
class BackstageMenu extends React.Component {

  render() {
    return (
      <Menu
        className="backstage-menu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={this.props.collapsed}
      >
        <Menu.Item key="1" onClick={() => {
          this.props.history.push('/admin')
        }}>
          <Icon type="pie-chart" />
          <span>网站分析</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => {
          this.props.history.push('/admin/user')
        }}>
          <Icon type="desktop" />
          <span>用户列表</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="inbox" />
          <span>课程列表</span>
        </Menu.Item>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>文章列表</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="mail" /><span>结果页</span></span>}>
          <Menu.Item key="13">成功</Menu.Item>
          <Menu.Item key="14">失败</Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>异常页</span></span>}>
          <Menu.Item key="5">403</Menu.Item>
          <Menu.Item key="6">404</Menu.Item>
          <Menu.Item key="7">500</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default BackstageMenu