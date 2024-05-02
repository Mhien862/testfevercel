import React, { useEffect, useState } from "react";
import { Button, Card, Image, List, Tooltip, Typography } from "antd";
import axiosInstance from "../services/axios.service";
import { CommentOutlined, LikeOutlined, FileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const App = () => {
  const [data, setData] = useState([]);
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/event-by-id/${id}`);
      const { contribution } = response.data;
      setData(contribution); // Combine event and contribution details
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/contribute");
  };

  const handleLike = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].liked = !newData[index].liked;
      return newData;
    });
  };

  const handleComment = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].commented = !newData[index].commented;
      return newData;
    });
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      alert("Please allow popups for this website");
    }
  };

  const renderFiles = (files) => {
    return files.map((file, fileIndex) => {
      if (file.mimetype.startsWith("image/")) {
        return <Image key={fileIndex} src={file.path} width={200} />;
      } else if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return (
          <div key={fileIndex}>
            <a href="#" onClick={() => openInNewTab(file.path)}>
              <FileOutlined style={{ fontSize: 20, marginRight: 8 }} />
              <Text type="secondary">{file.originalname}</Text>
            </a>
          </div>
        );
      }
      return null;
    });
  };

  const renderCards = () => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <Card key={item._id} style={{ marginBottom: "1cm" }}>
          <Card.Meta
            avatar={<Image src={item.avatar} />}
            title={item.username}
            description={item.time}
          />
          <div>
            <p>{item.content}</p>
            {renderFiles(item.files)}
          </div>
          <div>
            <Tooltip title={item.liked ? "Unlike" : "Like"}>
              <Button
                icon={<LikeOutlined />}
                type={item.liked ? "primary" : "default"}
                onClick={() => handleLike(index)}
              >
                {item.liked ? "Liked" : "Like"}
              </Button>
            </Tooltip>
            <Tooltip title={item.commented ? "Hide comment" : "Comment"}>
              <Button
                icon={<CommentOutlined />}
                type={item.commented ? "primary" : "default"}
                onClick={() => handleComment(index)}
              >
                {item.commented ? "Commented" : "Comment"}
              </Button>
            </Tooltip>
            {item.commented && (
              <Comment content={<p>Your comment content here...</p>} />
            )}
          </div>
        </Card>
      ));
    } else {
      return <p>No data available</p>;
    }
  };

  return (
    <div style={{ border: "1px solid #e0e0e0", padding: "20px" }}>
      <Button onClick={handleCreate} type="primary" block>
        New Post
      </Button>
      {renderCards()}
    </div>
  );
};

export default App;
