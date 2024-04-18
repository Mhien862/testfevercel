import { Button, Form, Input, notification } from 'antd';

import { useNavigate } from 'react-router-dom';
import '../assets/styles/login.css';

import { forgotAPI } from '../services/UserService';

const Forgot = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      let res = await forgotAPI(values.email);

      console.log(res);

      openNotification();

      navigate(`/reset?token=${res}`, values);
    } catch (error) {
      console.log(222, error);
      notification.open({
        message: error.response.data.message,
      });
    }
  };

  const openNotification = () => {
    notification.open({
      message: 'Pass',
    });
  };
  const onFinishFailed = (values) => {
    console.log('Failed:', values);
  };
  return (
    <div className="loginContainer">
      <h3 className="heading-login">Forgot password</h3>
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
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="button">
          <Button block type="primary" htmlType="submit">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Forgot;
