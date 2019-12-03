import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';


class HorizontalLoginForm extends React.Component {
  componentDidMount() {

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{margin:'3%'}}>
        <Form.Item style={{marginRight:'3%'}}>
        {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item style={{marginRight:'0'}}>
          <Button type="primary" shape="circle" htmlType="submit">
            十
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default WrappedHorizontalLoginForm;