import { useState } from "react";
import "./App.css";
import { Button, Input, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Dinh Duc",
      age: "22",
      address: "Quang Tri",
    },
    {
      id: 2,
      name: "Huynh Nhat",
      age: "27",
      address: "Hue",
    },
    {
      id: 3,
      name: "Huynh Nhan",
      age: "23",
      address: "Gia Lai",
    },
    {
      id: 4,
      name: "Huy Bmt",
      age: "22",
      address: "DakLak",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => onEditEmployee(record)} />
            <DeleteOutlined
              onClick={() => onDeleteEmployee(record)}
              className="delete"
            />
          </>
        );
      },
    },
  ];
  const onAddStudent = () => {
    const length = dataSource.length + 1;
    const newEmployee = {
      id: length,
      name: name,
      age: age,
      address: address,
    };

    setName("");
    setAge("");
    setAddress("");

    setDataSource((pre) => {
      return [...pre, newEmployee];
    });
  };
  const onDeleteEmployee = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete item record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((employee) => employee.id !== record.id);
        });
      },
    });
  };
  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="Add">
          <Input
            placeholder="Name"
            value={name}
            className="input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            placeholder="Age"
            className="input"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <Input
            placeholder="Address"
            value={address}
            className="input"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />{" "}
          <Button type="primary" onClick={onAddStudent}>
            Add new
          </Button>
        </div>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Employee"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((employee) => {
                if (employee.id === editingEmployee.id) {
                  return editingEmployee;
                } else {
                  return employee;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingEmployee?.name}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingEmployee?.age}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, age: e.target.value };
              });
            }}
          />
          <Input
            value={editingEmployee?.address}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
