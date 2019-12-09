import { Form, Icon, Input, Button} from 'antd';
import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
class NormalLoginForm extends React.Component {

  componentDidMount() {
    this.props.socket.on('new message',(data)=>{
      this.props.messageCallback(data);
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.socket.emit('new message', {
          user: this.props.user,
          message: values.message
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="login-form" style={{marginLeft:'7%',width:'90%'}}>
        <Form.Item>
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="message" style={{fontSize:'18px', marginLeft:'-30%'}} />}
              placeholder="Messaging..."
              style={{width:'200%'}}
            />,
          )}
        </Form.Item>

        <Form.Item style={{float:'right'}}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            <Icon type="message" style={{fontSize:'20px'}} />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const Messaging = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Messaging;