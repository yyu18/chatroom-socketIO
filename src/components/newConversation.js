import React from 'react';
import { Form, Icon, Input, Button } from 'antd';


class HorizontalLoginForm extends React.Component {
    componentDidMount() {

      }  

  handleSubmit = e => {
    let user = 'hubert';
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const UserClient = {
          'user':user,
          'client':values.client
        }
        this.props.clientCallback(UserClient);
        this.props.chatbox.current.hidden=false;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{margin:'3%'}}>
        <Form.Item>
        {getFieldDecorator('client', {
            rules: [{ required: true, message: 'Contact Infomation Is Empty!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Client"
            />,
          )}
        </Form.Item>
        <Form.Item style={{float:"right"}}>
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