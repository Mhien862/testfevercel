import { Button, Form, Input, notification } from "antd";
import "../assets/styles/login.css";
import { loginAPI } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import {
  SmileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]);
  const onFinish = async (values) => {
    try {
      let res = await loginAPI(values.email, values.password);
      setCookie("user", values, { path: "/" });

      if (res && res.accessToken)
        localStorage.setItem("accessToken", res.accessToken);

      openNotification();
      navigate("/createuser");
    } catch (error) {
      console.log(222, error);
      notification.open({
        message: "LOGIN FAIL",
        icon: (
          <WarningOutlined
            style={{
              color: "#e91010",
            }}
          />
        ),
      });
    }
  };

  const openNotification = () => {
    notification.open({
      message: "LOGIN SUCCESS",
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#008cff",
          }}
        />
      ),
    });
  };

  return (
    <div className="loginContainer">
      <h1 className="heading-login">welcome</h1>
      <h3 className="heading-login">Log in with your working account</h3>
      <Form
        name="basic"
        style={{
          width: 400,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="button">
          <Button block type="primary" htmlType="submit" onClick={onFinish}>
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
