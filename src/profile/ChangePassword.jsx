import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./../assets/styles/profile.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const clickCancel = () => {
    navigate("/profile");
  };
  return (
    <div>
      <h1 className="headingProfile">Change Password</h1>
      <div className="profile">
        <h3
          style={{
            textAlign: "center",
          }}
        >
          Now you can crate a new password for account
        </h3>
        <Form
          name="nest-messages"
          style={{
            marginLeft: 40,
            maxWidth: 500,
          }}
        >
          <Form.Item
            name={["password", "current"]}
            label="Current Password"
            rules={[
              {
                type: "password",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["password", "new"]}
            label="New Password"
            rules={[
              {
                type: "password",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["password", "confirm"]}
            label="Confirm Password"
            rules={[
              {
                type: "password",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                marginRight: 20,
              }}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
            <Button onClick={clickCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
