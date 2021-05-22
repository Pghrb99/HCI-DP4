import './LoginPage.scss';
import Sidemenu from './Sections/SideMenu/Sidemenu'
import {  Input, Space  } from 'antd';
import {  EyeInvisibleOutlined, EyeTwoTone  } from '@ant-design/icons';

import logo from './Sections/imgs/logo.svg'

function LoginPage(props) {
  return (
    <div className="LoginPage">
      <Sidemenu />
      <Space direction="vertical">
        <Input.Password placeholder="input password" />
        <Input.Password
          placeholder="input password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Space>
    </div>
  );
}
export default LoginPage;
