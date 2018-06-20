import React from 'react'
import CustomIcon  from '@/common/customIcon/customIcon'
import './videoChapterList.scss'
export default class VideoChapterList extends React.Component {
  render() {
    const tree = [
      {
        "title": '第1章 课程介绍',
        "kid": [
          {
            "title": "1-1 课程介绍(06:24)"
          }
        ]
      },
      {
        "title": '第2章 基础语法知识',
        "kid": [
          {
            "title": "1-1 课程介绍(06:24)"
          }
        ]
      },

      {
        "title": "第3章 mobx常用api讲解",
        "kid": [
          {
            "title": "1-1 课程介绍(06:24)"
          }
        ]
      },
      {
        "title": '第4章 mobx的应用',
        "kid": [
          {
            "title": "1-1 课程介绍(06:24)"
          }
        ]
      },
      {
        "title": '第5章 最佳实践',
        "kid": [
          {
            "title": "1-1 课程介绍(06:24)"
          }
        ]
      },
    ]
    return (
      <div className={`${this.props.className}`}>
        {tree.map(v => (
          <div className="list-ul">
            <ul>
              <li className="sec-title">{v.title}</li>
              {v.kid?<li className="sec-li">{v.kid.map(b=>{
                return (
                  <a><CustomIcon type={"video02"} size={16} className="video-logo"/>{b.title}</a>
                )
              })}</li>:null}
            </ul>
          </div>
        ))}
      </div>
    )
  }
}
