import { useState } from "react";
import { Form, Button, Upload, Radio, Checkbox, notification } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadImageEventAPI } from "../services/EventService";

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState();
  const [isSelected, setIsSelected] = useState(false); // Thêm isSelected state
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    const { _id } = JSON.parse(localStorage.getItem("userProfile"));
    // fileList.forEach(c => {
    //   formData.append("files", file);
    // });

    values.upload.forEach((i) => {
      console.log(i);
      formData.append("files", i.originFileObj);
    });

    console.log();

    formData.append("Faculty", values.faculty);
    formData.append("isSelected", isSelected); // Thêm isSelected vào formData
    formData.append("_id", _id);
    setLoading(true);
    try {
      // Here you can make an API call to post the data to the social network
      // Replace the following with your actual API call
      console.log("Posting data:", values);
      // Example API call using fetch
      const eventId = pathname.split("/").find((item, index) => {
        if (index === 3) return item;
      });
      console.log(event);

      const response = await uploadImageEventAPI(eventId, formData);
      console.log(response);

      if (response) {
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
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log("file, fileList", file, fileList);
      }
    },
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
