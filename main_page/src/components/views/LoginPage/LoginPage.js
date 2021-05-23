import './LoginPage.scss';
import TopBar from './Sections/TopBar/TopBar'
import Sidemenu from '../../views/TagSearchPage/Sections/SideMenu/Sidemenu'
import {  Form, Input, Button, Checkbox, Space, Card, Layout  } from 'antd';
import {  UserOutlined, LockOutlined  } from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
const formItemLayout = {
  labelCol: {
    xs: { span: 24,
          offset: 4, },
    sm: { span: 8,
          offset: 0, },
  },
  wrapperCol: {
    xs: { span: 24 ,
          offset: 8, },
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
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Layout style={{backgroundColor: "rgb(247, 247, 247)"}}>
      <Header style={{backgroundColor: "rgb(247, 247, 247)"}}>
        <Sidemenu />
        <TopBar userName={"Changhae"} isSignedIn={false}/>
      </Header>
      
      <Content className="container">

        <Card className="container" style={{padding: "24px", backgroundColor: "rgb(247, 247, 247)"}} >

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
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Space>
          </Form.Item>
        </Form>
        </Card>

      </Content>
    </Layout>

  );
}
export default LoginPage;
