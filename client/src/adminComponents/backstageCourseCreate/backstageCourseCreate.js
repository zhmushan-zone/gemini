import React from 'react'
import { Form, Button } from 'antd'
import TitleInput from '../backstageCourseCreateItem/titleInput/titleInput'
import DifficultySelect from '../backstageCourseCreateItem/difficultySelect/difficultySelect'
import DirectionSelect from '../backstageCourseCreateItem/directionSelect/directionSelect'
import CoverUpload from '../backstageCourseCreateItem/coverUpload/coverUpload'
import DescInput from '../backstageCourseCreateItem/descInput/descInput'

import './backstageCourseCreate.scss'

const FormItem = Form.Item

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
      price: '',
    }
    this.stateChange = this.stateChange.bind(this)
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
    const { getFieldDecorator } = this.props.form

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
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入课程标题'
              }]
            })(
              <TitleInput 
                titleChange={this.stateChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程难度"
          >
            {getFieldDecorator('difficulty', {
              rules: [{
                required: true, message: '请选择课程难度'
              }]
            })(
              <DifficultySelect 
                difficultyChange={this.stateChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程方向"
          >
            {getFieldDecorator('direction', {
              rules: [{
                required: true, message: '请选择课程方向'
              }]
            })(
              <DirectionSelect 
                directionChange={this.stateChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程封面"
          >
            {getFieldDecorator('cover', {
              rules: [{
                required: true, message: '请输入课程标题'
              }]
            })(
              <CoverUpload
                coverChange={this.stateChange}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课程介绍"
          >
            {getFieldDecorator('desc', {
              rules: [{
                required: true, message: '请输入课程介绍'
              }]
            })(
              <DescInput
                descChange={this.stateChange}
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default BackstageCourseCreate = Form.create({})(BackstageCourseCreate);