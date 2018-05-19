import React from "react"
import Banner from '@/components/banner/banner'
import Recommend from '@/components/recommend/recommend'

import './home.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home-top">
          <Banner />
          <Recommend />
        </div>
      </div>
    )
  }
}

export default Home
