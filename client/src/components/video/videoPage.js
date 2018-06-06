import React, { Component } from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
export default class VideoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Video autoPlay loop muted
          controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
          poster="http://sourceposter.jpg"
          onCanPlayThrough={() => {
            // Do stuff
          }}>
          <source src={`/api/videos/${this.props.match.params.id}`} type="video/webm" />
          {/* <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default /> */}
        </Video>
      </div>
    )
  }
}
// 5b17d27bc8eff3b610c9323c
