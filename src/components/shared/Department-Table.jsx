import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Select, Popconfirm } from 'antd';
//import { MinusCircleFilled } from '@ant-design/icons';
import DepartmentAdd from '../Add-Department';

const { Search } = Input;
const { Option } = Select;

const data_dept = [
  {
    key: '1',
    dept_id: 1,
    //departmentcode: 101,
    Dept_Name: 'Human Resources',
  },
  {
    key: '2',
    dept_id: 2,
    //departmentcode: 102,
    Dept_Name: 'Information Technology',
  },
  {
    key: '3',
    dept_id: 3,
    //departmentcode: 103,
    Dept_Name: 'Finance',
  },
  {
    key: '4',
    dept_id: 4,
    //departmentcode: 104,
    Dept_Name: 'Sales',
  },
  {
    key: '5',
    dept_id: 5,
    //departmentcode: 105,
    Dept_Name: 'Marketing',
  },
];


const TablesDept = ({datadept = data_dept}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('Dept_Name');
  const [data, setData] = useState(datadept);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:9036/departments');
      if (response.ok) {
        const departments = await response.json();
        setData(departments);
      } else {
        console.error('Failed to fetch departments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const refreshTable = useCallback(async () => {
    await fetchDepartments();
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
      const response = await fetch(`http://localhost:9036/departments/${key}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(data.filter(item => item.key !== key));
        console.log('Departments deleted successfully');
        refreshTable();
      } else {
        console.error('Error deleting departmens:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const columns_dept = [
    {
      title: <div data-testid='departmentid'>Id</div>,
      dataIndex: 'dept_id',
      key: 'dept_id',
      sorter: (a, b) => a.dept_id - b.dept_id,
    },
    // {
    //   title: <div data-testid='departmentcode'>Code</div>,
    //   dataIndex: 'departmentcode',
    //   key: 'departmentcode',
    //   sorter: (a, b) => a.departmentcode - b.departmentcode,
    // },
    {
      title: <div data-testid='departmentname'>Department Name</div>,
      dataIndex: 'Dept_Name',
      key: 'Dept_Name',
      sorter: (a, b) => a.Dept_Name.localeCompare(b.Dept_Name),
    },
    {
      title: '',
      key: 'delete',
      width: 250,
      render: (record) => (
        <div className="flex justify-center">
        <Popconfirm
          title="Are you sure to delete this row?"
          onConfirm={() => handleDelete(record.dept_id)}
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
  ];

  const filteredData = data.filter(item => 
    item[searchColumn].toString().toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, marginLeft: 5, marginTop:16 }}>
        <DepartmentAdd refreshTable={refreshTable}/>
      </div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="Dept_Name"
          style={{ width: 200, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="dept_id">Id</Option>
          <Option value="Dept_Name"> Department Name</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex:1 }}
        />
      </div>
      <Table columns={columns_dept} dataSource={filteredData} />
    </div>
  );
};

export default TablesDept;
