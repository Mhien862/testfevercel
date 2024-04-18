import React, { useEffect, useState } from "react";
import { Button, Card, Image, List, Tooltip } from "antd";
import axiosInstance from "../services/axios.service";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/event-by-id?eventId=${id}`);
      const eventData = response.data.event;

      const contributionDetails = await Promise.all(
        eventData.contributions.map(async (contributionId) => {
          const contributionResponse = await axiosInstance.get(
            `/upload?contributionId=${contributionId}`
          );
          return contributionResponse.data.contribution;
        })
      );

      setData(contributionDetails); // Combine event and contribution details
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

  const renderCards = () => {
    if (data && data.length > 0) {
      return data.map((item, index) => (
        <Card key={item._id} style={{ marginBottom: 20 }}>
          {/* Username */}
          <p>USERNAME: {item.username}</p>

          {/* Files */}
          <List
            itemLayout="horizontal"
            dataSource={item.files}
            renderItem={(file) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    file.mimetype.startsWith("image/") ? (
                      <Image
                        src={`http://localhost:1000/contribution-img/${file.filename}`} // Replace with image URL provider
                        width={200}
                      />
                    ) : file.mimetype === "application/msword" ? (
                      <Image
                        src="path_to_doc_icon" // Provide path to a doc icon image
                        width={200}
                        alt="doc"
                      />
                    ) : null
                  }
                  title={file.originalname}
                />
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
              </List.Item>
            )}
          />
        </Card>
      ));
    } else {
      return <p>No data available</p>;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button
        block
        onClick={handleCreate}
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
