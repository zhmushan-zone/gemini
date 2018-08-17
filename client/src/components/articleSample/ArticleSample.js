import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticleOne } from '@/redux/actions'
@connect(
  (state) => state.article,
  {fetchArticleOne}
)
export default class ArticleSample extends Component {
	componentWillMount = () => {
    this.props.fetchArticleOne(this.props.match.params.id)
	}
	render() {
    try {
      var {title, coverImg , authorId,type}=this.props.article
    } catch (error) {
      
    }
		return (
    <div>
      <h2>标题{title}</h2>
    </div>
    )
	}
}
