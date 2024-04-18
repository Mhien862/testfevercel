import { Button, Col, Row } from "antd";
import "./../assets/styles/profile.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios.service";
import { useEffect, useState } from "react";

const getProfile = () => {
  const [data, setProfile] = useState({
    username: "",
    roleName: "",
    faculty: "",
    email: "",
    password: "",
  });
  // useEffect(()=>{
  //   fetch('http://localhost:1000/profile')
  //     .then(response => response.json())
  //     .then(json => setData(json))
  // },[]);

  const fetchService = async () => {
    const response = await axiosInstance.get("/profile", {});
    setProfile(response.data);
    console.log(response);
  };

  useEffect(() => {
    // call API
    fetchService();
  }, []);

  const navigate = useNavigate();
  const changePassword = () => {
    navigate("/change_password");
  };
  return (
    <div>
      <h1 className="headingProfile">My Profile</h1>
      <div className="profile">
        <div className="profile-one">
          <Row>
            <Col span={8}>
              <div>
                <Row>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Name</span>
                      <br></br>
                      <span>{data.username}</span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Email</span>
                      <br></br>
                      <span>{data.email}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            {/* <Col span={8}>
              <div>
                <Row>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Phone Number</span>
                      <br></br>
                      <span></span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>DOB</span>
                      <br></br>
                      <span>21/03/2023</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col> */}
            <Col span={8}>
              <div>
                <Row>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Faculty</span>
                      <br></br>
                      <span>{data.faculty}</span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="profile-grid">
                      <span>Role</span>
                      <br></br>
                      <span>{data.role}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="buttonProfile">
          <Row
            gutter={16}
            style={{
              paddingLeft: 16,
            }}
          >
            <Col>
              <Button onClick={changePassword}>Change Password</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default getProfile;
