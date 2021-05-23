import React, { useState } from 'react';
import './RegisterPage.scss';
import TopBar from './Sections/TopBar/TopBar'
import Sidemenu from '../../views/TagSearchPage/Sections/SideMenu/Sidemenu'
import {  EyeInvisibleOutlined, EyeTwoTone, UserOutlined  } from '@ant-design/icons';

import {   
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
          offset: 4, },
    sm: { span: 8,
          offset: 0, },
  },
  wrapperCol: {
    xs: { span: 24 ,
          offset: 4, },
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

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);



  return (
    <Layout style={{backgroundColor: "rgb(247, 247, 247)"}}>
      <Header style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <Sidemenu />
        <TopBar userName={"Changhae"} isSignedIn={false} />
      </Header>

      <Content className="container">
        <Card style={{padding: "24px", backgroundColor: "rgb(247, 247, 247)"}}>

          <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
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
            rules={[
              {
                required: true,
                message: 'Please input your password!',
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
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        </Card>
      </Content>
    </Layout>

  );
}
export default RegisterPage;
