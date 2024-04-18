import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GroupOutlined,
  UserOutlined,
  IdcardOutlined,
  GithubOutlined,
  FireOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../assets/styles/headerlayout.css";
import axiosInstance from "../services/axios.service";

const { Header, Sider } = Layout;

const LayOut = () => {
  const [data, setProfile] = useState({
    username: "",
  });

  const fetchService = async () => {
    const response = await axiosInstance.get("/profile", {});
    setProfile(response.data);
    console.log(response);
  };

  useEffect(() => {
    // call API
    fetchService();
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // tới trang profile
  const toProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    // localStorage.removeItem('accessToken') ?? '';
    // window.location.href = '/login';
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: 740,
        width: "100%",
      }}
    >
      <Sider trigger={null} theme="light" collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div
          style={{
            color: "black",
            backgroundColor: "white",
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 28,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <p>Menu</p>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <IdcardOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/user">User</Link>,
            },
            {
              key: "3",
              icon: <FireOutlined />,
              label: <Link to="/event">Event </Link>,
            },
            {
              key: "4",
              icon: <InstagramOutlined />,
              label: <Link to="/listcontribute">Contribute </Link>,
            },
            {
              key: "5",
              icon: <GithubOutlined />,
              label: <Link to="/">About us </Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="dropdown">
            <img
              src="src/assets/witch-155291_640.webp"
              alt=""
              className="img"
            />
            <span className="nameAdmin">Admin</span>
            <div className="dropAdmin">
              <ul>
                <li onClick={toProfile}>Profile</li>
                <li onClick={handleLogout} className="logout-profile">
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default LayOut;
