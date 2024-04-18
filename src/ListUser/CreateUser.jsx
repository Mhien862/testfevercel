import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SmileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { userAPI } from "../services/UserService";

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await userAPI(
        values.username,
        values.email,
        values.password,
        values.roleName,
        values.facultyName
      );
      console.log(res);
      navigate("/user");
      notification.open({
        message: "Create Success",
        icon: <CheckCircleOutlined style={{ color: "#00ff66" }} />,
      });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        notification.open({
          message: error.response.data.message,
          icon: <WarningOutlined style={{ color: "#e91010" }} />,
        });
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <Form
          form={form}
          name="signup"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <h1>Create Account</h1>
          <Form.Item
            label="Username"
            name="username"
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
            label="Role"
            name="roleName"
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Faculty"
            name="facultyName"
            rules={[
              {
                required: true,
                message: "Please input your faculty!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email address!",
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
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
