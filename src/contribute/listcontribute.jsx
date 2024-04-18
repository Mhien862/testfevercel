import React, { useEffect, useState } from "react";
import { Button, Card, List, Tooltip, Input, Avatar, Image } from "antd";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import axiosInstance from "../services/axios.service";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:1000/contribution"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const renderFile = (file) => {
    if (file.mimetype.startsWith("image/")) {
      return (
        <Image
          src={`http://localhost:1000/contribution-img/${file.filename}`}
          style={{ maxWidth: "100%", marginBottom: 10 }}
        />
      );
    } else if (file.mimetype === "application/msword") {
      return (
        <a
          href={`http://localhost:1000/contribution-file/${file.filename}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {file.originalname}
        </a>
      );
    } else {
      return null; // You can add support for other file types as needed
    }
  };

  const renderCards = () => {
    return data.map((item, index) => (
      <Card key={item._id} style={{ marginBottom: 20 }}>
        <List
          itemLayout="vertical"
          dataSource={[item]}
          renderItem={(post) => (
            <List.Item
              actions={[
                <Tooltip key="like" title={post.liked ? "Unlike" : "Like"}>
                  <Button
                    icon={<LikeOutlined />}
                    type={post.liked ? "primary" : "default"}
                    onClick={() => handleLike(index)}
                  >
                    {post.liked ? "Liked" : "Like"}
                  </Button>
                </Tooltip>,
                <Tooltip
                  key="comment"
                  title={post.commented ? "Hide comment" : "Comment"}
                >
                  <Button
                    icon={<CommentOutlined />}
                    type={post.commented ? "primary" : "default"}
                    onClick={() => handleComment(index)}
                  >
                    {post.commented ? "Commented" : "Comment"}
                  </Button>
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span>{item.username}</span>}
                description={item.faculty}
              />
              <div style={{ marginBottom: 10 }}>{item.content}</div>
              {item.files && item.files.length > 0 && (
                <div>
                  {item.files.map((file, fileIndex) => (
                    <div key={fileIndex} style={{ marginBottom: 10 }}>
                      {renderFile(file)}
                    </div>
                  ))}
                </div>
              )}
              {item.commented && (
                <List
                  dataSource={item.comments}
                  renderItem={(comment) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={comment.avatar} />}
                        title={comment.username}
                        description={comment.content}
                      />
                    </List.Item>
                  )}
                />
              )}
            </List.Item>
          )}
        />
      </Card>
    ));
  };

  return (
    <div style={{ padding: "20px 40px" }}>
      <div style={{ marginBottom: 20 }}>
        <Search placeholder="Search posts..." enterButton />
      </div>
      <Button
        onClick={handleCreate}
        block
        type="primary"
        style={{ marginBottom: 20 }}
      >
        New Post
      </Button>
      {renderCards()}
    </div>
  );
};

export default App;
