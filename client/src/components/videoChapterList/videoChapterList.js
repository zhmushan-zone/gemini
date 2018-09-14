import React from 'react'
import CustomIcon from '@/common/customIcon/customIcon'
import './videoChapterList.scss'
import { withRouter } from 'react-router-dom'
@withRouter
export default class VideoChapterList extends React.Component {
	handleSee(videoId) {
		this.props.seeMovie(videoId)
	}
	render() {
		const { sections } = this.props
		return (
			<div className={`${this.props.className}`}>
				{sections.map((v, i) => (
					<div className='list-ul' key={v.title}>
						<ul>
							<li className='sec-title'>{`第${i + 1}章- ` + v.title}</li>
							{v.nodes ? (
								<li className='sec-li'>
									{v.nodes.map((b, j) => {
										return (
											<a
												className='list'
												key={b.title}
												onClick={() => {
													this.handleSee(b.video)
												}}
											>
												<CustomIcon type={'video02'} size={16} className='video-logo' />
												{`${i + 1}-${j + 1}- ` + b.title}
											</a>
										)
									})}
								</li>
							) : null}
						</ul>
					</div>
				))}
			</div>
		)
	}
}
