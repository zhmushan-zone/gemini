import React from "react"
import Banner from '@/components/banner/banner'

import './home.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Banner />
      </div>
    )
  }
}

export default Home
