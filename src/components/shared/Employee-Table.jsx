import React, { useState, useEffect, useCallback  } from 'react';
import { Table, Input, Select, Popconfirm } from 'antd';
//import { MinusCircleFilled } from '@ant-design/icons';
import EmployeeModify from '../Modify-Employee';
import EmployeeAdd from '../Add-Employee';

const { Search } = Input;
const { Option } = Select;

const data_emp = [
  {
    key: '1',
    emp_id: 1,
    name: 'John Brown',
    dept_id: 1,
    manager_id: 201,
    email: 'john.brown@example.com',
    phone: '1234567890',
    address: 'New York No. 1 Lake Park',
    dob: '1990-01-01',
  },
  {
    key: '2',
    emp_id: 2,
    name: 'Jim Green',
    dept_id: 2,
    manager_id: 202,
    email: 'jim.green@example.com',
    phone: '0987654321',
    address: 'London No. 1 Lake Park',
    dob: '1982-05-12',
  },
  {
    key: '3',
    emp_id: 3,
    name: 'Joe Black',
    dept_id: 3,
    manager_id: 203,
    email: 'joe.black@example.com',
    phone: '1112223333',
    address: 'Sydney No. 1 Lake Park',
    dob: '1990-03-15',
  },
  {
    key: '4',
    emp_id: 4,
    name: 'Jane Doe',
    dept_id: 4,
    manager_id: 204,
    email: 'jane.doe@example.com',
    phone: '4445556666',
    address: 'San Francisco No. 2 Lake Park',
    dob: '1993-09-21',
  },
  {
    key: '5',
    emp_id: 5,
    name: 'Michael Johnson',
    dept_id: 5,
    manager_id: 205,
    email: 'michael.johnson@example.com',
    phone: '7778889999',
    address: 'Los Angeles No. 3 Lake Park',
    dob: '1978-11-30',
  },
];

const TablesEmp = ({dataemp = data_emp}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('name');
  const [data, setData] = useState(dataemp);


  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:9036/employees');
      if (response.ok) {
        const employees = await response.json();
        setData(employees);
      } else {
        console.error('Failed to fetch employees:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const refreshTable = useCallback(async () => {
    await fetchEmployees();
  }, []);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  const handleSearch = (selectedColumn, value) => {
    setSearchColumn(selectedColumn);
    setSearchText(value);
  };

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`http://localhost:9036/employees/${key}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(data.filter(item => item.key !== key));
        console.log('Employee deleted successfully');
        refreshTable();
      } else {
        console.error('Error deleting employee:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };


  const columns_emp = [
    {
      title: <div  data-testid='id'>Id</div>,
      dataIndex: 'emp_id',
      key: 'emp_id',
      sorter: (a, b) => a.emp_id - b.emp_id,
    },
    {
      title: <div  data-testid='name'>Name</div>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <div  data-testid='department'>Department</div>,
      dataIndex: 'dept_id',
      key: 'dept_id',
      sorter: (a, b) => a.dept_id - b.dept_id,
    },
    {
      title: <div  data-testid='manager'>Manager</div>,
      dataIndex: 'manager_id',
      key: 'manager_id',
      sorter: (a, b) => a.manager_id - b.manager_id,
    },
    {
      title: <div  data-testid='email'>Email</div>,
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: <div  data-testid='phone'>Phone</div>,
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone - (b.phone),
    },
    {
      title: <div  data-testid='address'>Address</div>,
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: <div  data-testid='dob'>DOB</div>,
      dataIndex: 'dob',
      key: 'dob',
      sorter: (a, b) => a.dob.localeCompare(b.dob),
    },
    {
      title: '',
      key: 'delete',
      width: 30,
      render: (record) => (
        <div className="flex justify-center">
        <Popconfirm
          title="Are you sure to delete this row?"
          onConfirm={() => handleDelete(record.emp_id)}
          okText="Yes"
          cancelText="No"
        >
          {/* <Button
            type="primary"
            danger
            shape="circle"
            icon={<MinusCircleFilled />}
            size="small"
            data-testid='deletebutton'
          /> */}
          <button
        className="text-red-600 shadow-red-400 hover:bg-red-200 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-red-600 focus:outline-none"
        data-testid='deletebutton'
      >
        Delete
      </button>
        </Popconfirm>
        </div>
      ),
    },
    {
      title: '',
      key: 'modifyemployee',
      render: (record) => (
        <div className="flex justify-center">
        <EmployeeModify record={record} refreshTable={refreshTable} />
        </div>
      ),
    },
  ];

  const filteredData = data.filter(item => 
    item[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, marginLeft: 5, marginTop:16 }}>
        <EmployeeAdd refreshTable={refreshTable}/>
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="name"
          style={{ width: 120, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="emp_id">Id</Option>
          <Option value="name">Name</Option>
          <Option value="dept_id">Department</Option>
          <Option value="manager_id">Manager</Option>
          <Option value="email">Email</Option>
          <Option value="phone">Phone</Option>
          <Option value="address">Address</Option>
          <Option value="dob">DOB</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex:1 }}
        />
      </div>
      <Table columns={columns_emp} dataSource={filteredData} />
    </div>
  );
};

export default TablesEmp;
