import React, { Component } from 'react'
import { Icon } from 'antd'
import './opinionMainCenterList.scss'
export default class opinionMainCenterList extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<div className='opinion-main-center-list-container'>
				<div className='article-lwrap'>
					<div className='imgCon'>
						<img src='https://www.imooc.com/static/img/article/cover/pic23.jpg' alt='' />
					</div>
					<div className='list-content'>
						<p>{this.props.title}</p>
						<div className='list-bottom'>
							<div className='content'>
								<div className='labels-area'>
									<a href=''>{this.props.direction}</a>
								</div>
								<div className='browseNum'>
									<Icon type='eye' />
									<span>{this.props.see}</span>
								</div>
								<a href='' className='nickName'>
									{this.props.author}
								</a>
								<div className='skill'>
									{this.props.tag.map((v) => {
										return (
											<React.Fragment key={v}>
												<a href=''>
													<span>{v}</span>
												</a>
												<a href=''> </a>
											</React.Fragment>
										)
									})}
								</div>
							</div>
							<div className='createTime'>{this.props.time}</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
