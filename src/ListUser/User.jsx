import { Button, Select, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axios.service";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Search from "antd/es/input/Search";
import {
  SmileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Option: AntdOption } = Select;

const User = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      render: (value) => (
        <div
          style={{
            textTransform: "lowercase",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, param2) => (
        <div>
          <Link to={`/detailservice/${param2.id}`}>
            <EyeOutlined />
          </Link>
          <Button
            type="link"
            onClick={() => {
              navigate(`/user/edit/${param2?._id}`);
            }}
          >
            <EditOutlined />
          </Button>
          <DeleteOutlined onClick={() => deleteService(param2._id)} />
        </div>
      ),
    },
  ];

  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    name: "",
    email: "",
    status: "",
  });

  const navigate = useNavigate();
  const [owners, setService] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState("Name");
  const [value, setValue] = useState("");

  const fetchService = async () => {
    const response = await axiosInstance.get("/user-list", {
      params: query,
    });
    setService(response.data);
  };

  const onTableChange = (pagination) => {
    setQuery({ ...query, page: pagination.current });
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const onInputChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = () => {
    if (type === "Name") {
      setQuery({ ...query, name: value });
    } else {
      setQuery({ ...query, email: value });
    }
  };

  const toCreateService = () => {
    navigate("/createuser");
  };

  useEffect(() => {
    fetchService();
  }, [query]);

  const deleteService = async (id) => {
    try {
      await axiosInstance.delete(`/user-list/${id}`);
      notification.open({
        message: "Delete Success",
        icon: <CheckCircleOutlined style={{ color: "#00ff66" }} />,
      });
      fetchService();
    } catch (error) {
      console.error("Delete Error:", error);
      notification.open({
        message: "Delete Failed",
        description: error.message,
        icon: <WarningOutlined style={{ color: "#e91010" }} />,
      });
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>List User</h2>
      <div style={{ marginBottom: 20 }}>
        <Space>
          <Select defaultValue={type} onChange={handleTypeChange}>
            <AntdOption value="Name">User Name</AntdOption>
            <AntdOption value="Email">Email</AntdOption>
          </Select>
          <Search
            placeholder="Search..."
            onChange={onInputChange}
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </div>
      <Table
        rowKey="id"
        dataSource={owners}
        columns={columns}
        scroll={{ x: 1500 }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
        }}
        onChange={onTableChange}
      />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button block type="primary" onClick={toCreateService}>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default User;
