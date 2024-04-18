import { Button, Form, Input, notification } from 'antd';

import { resetAPI } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // const navigate = useNavigate();
  const token = 'eyJlbWFpbCI6Im5ob20xQGdyci5sYSIsImV4cCI6MTY5OTI4NjcxMzg3MH0=';
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      let res = await resetAPI(token, values.password, values.confirmPassword);

      console.log(res);
      navigate(`/login`);

      openNotification();
    } catch (error) {
      console.log(222, error);
      notification.open({
        message: error.response.data.message,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const openNotification = () => {
    notification.open({
      message: 'RESET SUCCESS',
    });
  };
  return (
    <div className="loginContainer">
      <Form
        name="basic"
        style={{
          width: 400,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <h3 className="heading-login">Reset password</h3>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="button">
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Login;
