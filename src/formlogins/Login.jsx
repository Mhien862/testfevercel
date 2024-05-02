import { Button, Form, Input, notification } from "antd";
import "../assets/styles/login.css";
import { loginAPI } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (!values.email || !values.password) return;
    try {
      await loginAPI(values.email, values.password);
      openNotification("success", "LOGIN SUCCESS");
      navigate("/");
    } catch (error) {
      console.log(222, error);
      openNotification("error", "LOGIN FAIL");
    }
  };

  const openNotification = (type, message) => {
    notification.open({
      message: message,
      icon:
        type === "success" ? (
          <CheckCircleOutlined style={{ color: "#008cff" }} />
        ) : (
          <WarningOutlined style={{ color: "#e91010" }} />
        ),
    });
  };

  return (
    <div className="loginContainer">
      <h1 className="heading-login">Welcome</h1>
      <h3 className="heading-login">Log in with your working account</h3>
      <Form
        name="basic"
        style={{ width: "100%", maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="button">
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
          <div style={{ marginTop: 12 }}>
            <Link to="/forgot">Forgot password</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
