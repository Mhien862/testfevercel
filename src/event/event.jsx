import React, { useEffect, useState } from "react";
import { 
  Button, 
  Col, 
  Row, 
  Select, 
  Space, 
  Table, 
  notification,
  Form, 
  Input, 
  DatePicker,
} from "antd";
import axiosInstance from "../services/axios.service";
import { createEventAPI, editEventAPI } from "../services/EventService";
import { DeleteOutlined, EditOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [isCreate, setIsCreate] = useState(false);
  const [editId, setEditId] = useState('');
  const [isRefetch, setIsRefetch] = useState(false)

  const handleCreate = () => {
    setEditId('')
    setIsCreate(true)
    const formInput = (children, dataIndex) => 
    (<Form.Item
      name={dataIndex}
      style={{
        margin: 0,
      }}
      rules={[
        {
          required: true,
          message: `Please Input ${dataIndex}!`,
        },
      ]}>
        {children}
    </Form.Item>)
    const newData = {
      eventName: formInput(<Input style={{width: 80}}/>, 'eventName'),
      firstClosureDate: formInput(<DatePicker style={{width: 160}} />, 'firstClosureDate'),
      finalClosureDate:  formInput(<DatePicker style={{width: 160}} />, 'finalClosureDate'),
      academicYear: formInput(<Input style={{width: 160}}/>, 'academicYear'),
      faculty: formInput(<Input style={{width: 80}}/>, 'faculty'),
      isCreate: true,
    }
    setEvents([newData, ...events])
  }

  const handleEdit = (record) => {
    handleRefetch()
    form.setFieldsValue({
      ...record,
      firstClosureDate: '', // datepicker input is string not timestamp  
      finalClosureDate:  '', // datepicker input is string not timestamp 
    });
    setEditId(record._id)
  }

  const handleRefetch = () => {
    form.setFieldsValue({
      eventName: '',
      academicYear: '',
      faculty: '',
      firstClosureDate: '',
      finalClosureDate:  '',
    });
    setIsCreate(false)
    setEditId('')
  }

  const handleRemove = (index) => {
    if(!editId) {
      setEvents((pre) => {
        pre.splice(index, 1)
        return [...pre]
      })
    }
    handleRefetch()
  }

  const handleSave = async (isCreate, id) => {
    const newData = await form.validateFields();
    if (!!isCreate) {
      try {
        await createEventAPI(newData)
        notification.open({
          message: "Create Success",
          icon: (
            <CheckCircleOutlined
              style={{
                color: "#00ff66",
              }}
            />
          ),
        });
        setIsRefetch(true)
      } catch (error) {
        notification.open({
          message: error.response.data.message,
          icon: (
            <WarningOutlined
              style={{
                color: "#e91010",
              }}
            />
          ),
        });
      }
    } else {
      try {
        await editEventAPI({id, ...newData})
        notification.open({
          message: "Edit Success",
          icon: (
            <CheckCircleOutlined
              style={{
                color: "#00ff66",
              }}
            />
          ),
        });
        setIsRefetch(true)
        handleRefetch()
      } catch (error) {
        console.log(error.response.data.message)
        notification.open({
          message: error.response.data.message,
          icon: (
            <WarningOutlined
              style={{
                color: "#e91010",
              }}
            />
          ),
        });
      }
    }
  }

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = () => {
      if (dataIndex === 'academicYear') return <div>{children}</div>
      else if (['firstClosureDate', 'finalClosureDate'].includes(dataIndex)) return <DatePicker style={{width: 160}} />
      else return <Input style={{width: 80}}/>
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode()}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    name: "",
  });

  const fetchEvents = async () => {
    handleRefetch()
    try {
      const response = await axiosInstance.get("/event", {
        params: query,
      });
      setEvents(response.data.events);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setIsRefetch(false)
  };

  const onTableChange = (values) => {
    setQuery({ ...query, page: values.current }); // Cập nhật trang trong query
  };

  useEffect(() => {
    fetchEvents();
  }, [query, isRefetch]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/event/${id}`);
      notification.open({
        message: "Delete Success",
        icon: <CheckCircleOutlined style={{ color: "#00ff66" }} />,
      });
      // Sau khi xóa thành công, gọi lại fetchEvents để cập nhật danh sách sự kiện
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      notification.open({
        message: "Delete Failed",
        icon: <WarningOutlined style={{ color: "#e91010" }} />,
      });
    }
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      editable: true,
    },
    {
      title: "First Closure Date",
      dataIndex: "firstClosureDate",
      key: "firstClosureDate",
      editable: true,
    },
    {
      title: "Final Closure Date",
      dataIndex: "finalClosureDate",
      key: "finalClosureDate",
      editable: true,
    },
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      key: "academicYear",
      editable: true,
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      editable: true,

      render: (data) => (
        <div style={{ textTransform: "lowercase" }}>{data}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      
      render: (_, param2, index) => {
        if (param2?.isCreate || param2?._id === editId) {
        return (
          <div>
            <Button
              type="link"
              onClick={() => handleSave(param2?.isCreate, param2._id)}
            >
              <CheckOutlined />
            </Button>
            <Button
              type="link"
              onClick={() => handleRemove(index)}
            >
              <CloseOutlined />
            </Button>
          </div>
        )}
      return (
          <div>
            <Link to={`/event/detail/${param2?._id}`} disabled={isCreate}>
              <EyeOutlined />
            </Link>
            <Button
              type="link"
              onClick={() => handleEdit(param2)}
              disabled={isCreate}
            >
              <EditOutlined
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                }}
              />
            </Button>
            <Button type="link" onClick={() => handleDelete(record._id)}>
              <DeleteOutlined />
            </Button>
          </div>
      )},
    },
    {
      title: "Upload",
      dataIndex: "upload",
      key: "upload",
      render: (_, param2) => {
        if (!param2?.isCreate) {
          return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/event/post/${param2?._id}`);
              }}
            >
              Upload
            </Button>
          </div>
          )}
        return (
          <div></div>
        )
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: record._id === editId,
      }),
    };
  });

  return (
    <div className="profile" style={{ marginTop: 30, padding: "0 40px" }}>
      <div>
        <Row gutter={24} justify="space-between" align="middle">
          <Col span={6}>
            <h2>List Event</h2>
          </Col>
          <Col span={12}>
            <Space>
              <Select
                defaultValue="Name"
                onChange={(value) => setQuery({ ...query, name: value })}
              >
                <Select.Option value="Name">User Name</Select.Option>
                <Select.Option value="Email">Email</Select.Option>
              </Select>
              <Search
                placeholder="Search"
                onChange={(e) =>
                  setQuery({ ...query, keyword: e.target.value })
                }
                style={{ width: 200 }}
              />
            </Space>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
          <Button disabled={isCreate || !!editId} onClick={handleCreate}>Create Event</Button>
          </Col>
        </Row>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={events}
          columns={mergedColumns}
          pagination={pagination}
          onChange={onTableChange}
          rowKey="_id"
        />
      </Form>
    </div>
  );
};

export default Event;
