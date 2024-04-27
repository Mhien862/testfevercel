/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Space, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchServices } from "../store/reducers/service";
import axiosInstance from "../services/axios.service";
import { updateUser } from "../services/UserService";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";

const EditService = () => {
  let location = useLocation();
  console.log("location :", location);
  const navigate = useNavigate();
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const [form] = Form.useForm();

  const fetchService = async () => {
    const response = await axiosInstance.get(`/user?userId=${id}`);
    form.setFieldsValue(response.data);
  };

  useEffect(() => {
    fetchService();
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);

    form
      .validateFields()
      .then(async (values) => {
        const response = await axiosInstance.put(
          `user-list?userId=${id}`,
          values
        );

        console.log("response :", response);

        navigate("/user");
        notification.open({
          message: "Edit Success",
          icon: (
            <CheckCircleOutlined
              style={{
                color: "#00ff66",
              }}
            />
          ),
        });
      })
      .catch((error) => {
        console.error("Form validation error:", error);
        notification.open({
          message: error,
          icon: (
            <WarningOutlined
              style={{
                color: "#e91010",
              }}
            />
          ),
        });
      });
  };

  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    // useEffect(() => {}, [values, formSubmitted]);

    return (
      <Space>
        <Button type="primary" block htmlType="button" onClick={handleSubmit}>
          Edit
        </Button>
        <Button type="primary" block htmlType="button" onClick={handleSubmit}>
          Cancel
        </Button>
      </Space>
    );
  };

  // const validateNumber = (rule, value, callback) => {
  //   if (value === "") {
  //     callback();
  //   } else if (isNaN(value)) {
  //     callback("Please enter a valid number");
  //   } else {
  //     callback();
  //   }
  // };

  const { manageService } = useSelector((state) => state.service);
  const data = manageService?.items.map((value) => {
    return value;
  });

  // useEffect(() => {
  //   dispatch(fetchServices(params));
  // }, []);

  return (
    <div>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Form.Item
              name="username"
              label="User Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your name" defaultValue={data} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input placeholder="Enter email" defaultValue="" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please enter the role" }]}
            >
              <Input placeholder="Enter role" defaultValue="" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              name="faculty"
              label="Faculty"
              rules={[{ required: true, message: "Please enter the role" }]}
            >
              <Input placeholder="Enter faculty" defaultValue="" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <SubmitButton form={form} />
    </div>
  );
};

export default EditService;
