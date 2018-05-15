import React from 'react'
import './personCenter.scss'
class PersonCener extends React.Component {
  render() {
    return (
      <div className="personCenter-container">
        <div className="header">
          <div className="user-info">
            <div className="user-pic">
              <div className="user-pic-bg">
                <img src="" alt=""/>
              </div>
            </div>
            <div className="user-info-right">
              <h3 className="user-name"></h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PersonCener
