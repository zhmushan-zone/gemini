import React from 'react'
import Banner from '@/components/banner2/banner2'
import WebsiteIntroduce from '../../components/websiteIntroduce/websiteIntroduce'
import Recommend from '@/components/recommend/recommend'
import LastestCourse from '@/components/lastestCourse/lastestCourse'
import WonderfulContent from '@/components/wonderfulContent/wonderfulContent'
// import ExcellentUsers from '@/components/excellentUsers/excellentUsers'
import { connect } from 'react-redux'
import { getCourseList } from '@/redux/actions'
import { dateSortByCreate } from '@/util/dateSort'

import './home.scss'

@connect((state) => state.course, { getCourseList })
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hotCourse: [],
			latestCourse: [],
		}
	}

	async componentDidMount() {
		await this.props.getCourseList()
		const hotCourse = [ ...this.props.courses ].sort((a, b) => b.joinersId.length - a.joinersId.length).slice(0, 4)
		const latestCourse = dateSortByCreate([ ...this.props.courses ]).slice(0, 8)
		this.setState({
			hotCourse,
			latestCourse,
		})
	}
	render() {
		return (
			<div className='home'>
				<Banner />
				<WebsiteIntroduce />
				<Recommend hotCourse={this.state.hotCourse} />
				<LastestCourse latestCourse={this.state.latestCourse} />
				<WonderfulContent />
				{/* <ExcellentUsers /> */}
			</div>
		)
	}
}

export default Home
