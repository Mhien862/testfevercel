import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Radio,
  Checkbox,
  notification,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  SmileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isSelected, setIsSelected] = useState(false); // Thêm isSelected state
  const [eventId, setEventId] = useState(""); // State for event ID

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const navigate = useNavigate();
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onFinish = async (values) => {
    console.log(fileList);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("Title", values.Title);
    formData.append("Content", values.Content);
    formData.append("Faculty", values.faculty);
    formData.append("isSelected", isSelected); // Thêm isSelected vào formData
    formData.append("eventId", eventId); // Append eventId to formData
    setLoading(true);
    try {
      // Here you can make an API call to post the data to the social network
      // Replace the following with your actual API call
      console.log("Posting data:", values);
      // Example API call using fetch
      const response = await fetch("http://localhost:1000/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        console.log("Posted successfully");
        navigate("/listcontribute");
        notification.open({
          message: "Post Successfully",
          icon: (
            <CheckCircleOutlined
              style={{
                color: "#00ff66",
              }}
            />
          ),
        });
      } else {
        console.error("Failed to post");
      }
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setLoading(false);
    }
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <Form
      name="postForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item name="faculty" label="Faculty">
        <Radio.Group onChange={onChange} defaultValue="IT">
          <Radio.Button value="IT">IT</Radio.Button>
          <Radio.Button value="Business">Business</Radio.Button>
          <Radio.Button value="Design">Design</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Check if selected">
        <Checkbox
          checked={isSelected}
          onChange={(e) => setIsSelected(e.target.checked)}
        >
          Is Selected
        </Checkbox>
      </Form.Item>

      <Form.Item
        name="eventId"
        label="Event ID"
        rules={[{ required: true, message: "Please input the event ID!" }]}
      >
        <Input value={eventId} onChange={(e) => setEventId(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload Text and Picture"
      >
        <Upload {...props} name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger {...props} name="files">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
