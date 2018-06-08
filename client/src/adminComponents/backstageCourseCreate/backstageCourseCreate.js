import React from 'react'
import { Form, Input, Button } from 'antd'

import './backstageCourseCreate.scss'

const FormItem = Form.Item

class BackstageCourseCreate extends React.Component {
  handleSubmit() {
    console.log(1)
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
          offset: 8,
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
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
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