/* eslint-disable react/prop-types */
import { Button, Col, Form, Row, Space } from 'antd';
import React, { useState } from 'react';

const DetailService = () => {
  const [form] = Form.useForm();
  const SubmitButton = ({ form }) => {
    const values = Form.useWatch([], form);
    React.useEffect(() => {}, [values, formSubmitted]);

    return (
      <Space>
        <Button type="primary" htmlType="button" onClick={handleSubmit}>
          Edit
        </Button>
      </Space>
    );
  };
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);
      })
      .catch((error) => {
        console.error('Form validation error:', error);
      });
  };

  return (
    <div>
      <div className="profile">
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <Form.Item name="username" label="UserName">
                <div>User Name</div>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item name="email" label="Email">
                <div>Email</div>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item name="role" label="Role">
                <div>Role</div>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item name="faculty" label="Faculty">
                <div>Faculty</div>
              </Form.Item>
            </Col>
          </Row>
          <div>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <div>Text Area Text</div>
            </Form.Item>
          </div>
        </Form>
        <SubmitButton form={form} />
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default DetailService;
