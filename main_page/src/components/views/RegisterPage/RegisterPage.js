import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext'


import './RegisterPage.scss';
import Sidemenu from '../SideMenu/Sidemenu'
import {  EyeInvisibleOutlined, EyeTwoTone, UserOutlined  } from '@ant-design/icons';
import logo from './Sections/imgs/logo.svg'

import {   
  Alert,
  Layout, 
  Space,
  Card, 
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,  
  } from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
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
          offset: 0,  },
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

function RegisterPage(props) {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp, currentUser } = useAuth()
  const onClose = () => {
      setError('')
  }
  const onFinish = async (values) => {
    try {
      setError('')
      setLoading(true)
      await signUp(values.email, values.password);
      props.history.push("/login");
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
    console.log('Received values of form: ', values);
  };


  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <Layout style={{backgroundColor: "rgb(247, 247, 247)"}}>
      <Header style={{height: "80px", backgroundColor: "rgb(247, 247, 247)"}}>
        <Sidemenu />
        
      </Header>

      <Content className="container">
          <Row>
            <Col xs={{span: 16, offset: 4}}  sm={{span: 8, offset: 8}}>
              <Link to={"/"} className="logo"> <img src={logo}/> </Link>
            </Col>
          </Row>
          
          <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
          }}
          scrollToFirstError
          >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            validateFirst="parallel"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {              
                min: 6,
                message: 'Use 6 characters or more for your password',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space>
              <Button disabled={loading} type="primary" htmlType="submit">
                Register
              </Button>
              Or <Link to={"/login"}>log in now!</Link>
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
export default RegisterPage;
