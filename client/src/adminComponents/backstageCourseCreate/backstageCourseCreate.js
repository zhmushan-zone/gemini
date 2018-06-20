import React from 'react'
import { Form, Button, notification } from 'antd'
import TitleInput from '../backstageCourseCreateItem/titleInput/titleInput'
import DifficultySelect from '../backstageCourseCreateItem/difficultySelect/difficultySelect'
import DirectionSelect from '../backstageCourseCreateItem/directionSelect/directionSelect'
import CoverUpload from '../backstageCourseCreateItem/coverUpload/coverUpload'
import DescInput from '../backstageCourseCreateItem/descInput/descInput'
import TypeSelect from '../backstageCourseCreateItem/typeSelect/typeSelect'
import PriceInput from '../backstageCourseCreateItem/priceInput/priceInput'
import SectionAdd from '../backstageCourseCreateItem/sectionAdd/sectionAdd'
import { createCourse } from '@/redux/actions'
import { connect } from 'react-redux'

import './backstageCourseCreate.scss'

const FormItem = Form.Item

@connect(
  state => state.course,
  { createCourse }
)
class BackstageCourseCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      coverImg: '',
      desc: '',
      direction: '',
      type: [],
      difficulty: '',
      price: 0,
      sections: []
    }
    this.stateChange = this.stateChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    for (let item in this.state) {
      if ((!this.state[item] && this.state[item] !== 0) || this.state[item].length === 0 ) {
        return notification.open({
          message: '提交失败',
          description: '请完善您的课程信息,确认无误后再次提交'
        })
      }
    }
    return this.props.createCourse(this.state)
  }

  stateChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handleSubmit() {
    console.log(1)
  }

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    }
    return (
      <div className="backstage-course-create">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="课程标题"
          >
              <TitleInput 
                titleChange={this.stateChange}
                setFieldsValue={this.state.title}
              />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程难度"
          >
            <DifficultySelect 
              difficultyChange={this.stateChange}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程方向"
          >
            <DirectionSelect 
              directionChange={this.stateChange}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程分类"
          >
            <TypeSelect
              typeChange={this.stateChange}
              direction={this.state.direction}
              type={this.state.type}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所需积分"
          >
            <PriceInput
              priceChange={this.stateChange}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程封面"
          >
            <CoverUpload
              coverChange={this.stateChange}
              coverImg={this.state.coverImg}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程章节数"
          >
            <SectionAdd
              sectionChange={this.stateChange}
              sections={this.state.sections}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程介绍"
          >
            <DescInput
              descChange={this.stateChange}
            />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default BackstageCourseCreate = Form.create({})(BackstageCourseCreate)