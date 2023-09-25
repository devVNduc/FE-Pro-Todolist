import { Button, Form, Input } from 'antd';
import { emailRule, passwordRule } from '@/common/rules';
import { login } from '@/services/auth'
import { useNavigate } from 'react-router-dom';
import useNotification from '@/customHook/useNotify'
const Login = () => {
  const {contextHolder, infoNotify, errorNotify} = useNotification()
  const nav = useNavigate()
  const onFinish = async (values) => {
    try {
        let {jwt, user} = await login(values)

        localStorage.setItem('token', jwt)
        localStorage.setItem('user', JSON.stringify(user))
        nav('/')
    } catch ({response}) {
      var {error} = response.data
      errorNotify('topRight', 'Loi dang nhap', error.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    errorNotify('topRight', 'Loi dang nhap', 'Khong thanh cong')
  };


  return (
    <Form
    name="loginForm"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {contextHolder}
    <Form.Item
      label="Email"
      name="identifier"
      rules={emailRule}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={passwordRule}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
};
export default Login;