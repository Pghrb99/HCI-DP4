import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext'

import './LoginPage.scss';
import Sidemenu from '../../views/TagSearchPage/Sections/SideMenu/Sidemenu'
import {  Form, Input, Button, Checkbox, Space, Card, Layout, Alert  } from 'antd';
import {  UserOutlined, LockOutlined  } from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
const formItemLayout = {
  labelCol: {
    xs: { span: 24,
          offset: 0, },
    sm: { span: 8,
          offset: 0, },
  },
  wrapperCol: {
    xs: { span: 24 ,
          offset: 0, },
    sm: { span: 8,
          offset: 8,  },
  },
};
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
};

function LoginPage(props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const onClose = () => {
      setError('')
  }
  const onFinish = async (values) => {
    try {
      setError('')
      setLoading(true)
      await signIn(values.username, values.password);
      props.history.push("/");
    } catch {
      setError('Failed to login')
    }
    setLoading(false)
    console.log('Received values of form: ', values);
  };

  return (
    <Layout style={{backgroundColor: "rgb(247, 247, 247)"}}>
      <Header style={{height: "80px", backgroundColor: "rgb(247, 247, 247)"}}>
        <Sidemenu />
      </Header>
      
      <Content className="container">

        <Form
          {...formItemLayout}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button disabled={loading} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to={"/register"}>register now!</Link>
            </Space>
          </Form.Item>
        </Form>

      </Content>
      <Footer style={{height: "80px", backgroundColor: "rgb(247, 247, 247)"}}>
        {error && <Alert message={error} showIcon type="error" closable onClose={onClose}/>}
      </Footer>
    </Layout>

  );
}
export default LoginPage;
