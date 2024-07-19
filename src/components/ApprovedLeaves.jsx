import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Popconfirm } from 'antd';
import { MinusCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const data_approvedleaves = [
    {
      key: '1',
      leave_id: 1,
      emp_id: 1,
      leave_type_id: 101,
      start_date: '2024-07-01',
      end_date: '2024-07-05',
    },
    {
      key: '2',
      leave_id: 2,
      emp_id: 2,
      leave_type_id: 102,
      start_date: '2024-07-10',
      end_date: '2024-07-15',
    },
    {
      key: '3',
      leave_id: 3,
      emp_id: 3,
      leave_type_id: 103,
      start_date: '2024-08-01',
      end_date: '2024-08-05',
    },
    {
      key: '4',
      leave_id: 4,
      emp_id: 4,
      leave_type_id: 104,
      start_date: '2024-09-01',
      end_date: '2024-09-10',
    },
    {
      key: '5',
      leave_id: 5,
      emp_id: 5,
      leave_type_id: 105,
      start_date: '2024-10-01',
      end_date: '2024-10-05',
    },
  ];
  


const ApprovedLeaves = ({dataapprovedleaves = data_approvedleaves, refreshTable}) => {
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('emp_id');
  const [data, setData] = useState(dataapprovedleaves);


  useEffect(() => {
    setData(dataapprovedleaves);
  }, [dataapprovedleaves]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  const handleSearch = (selectedColumn, value) => {
    setSearchColumn(selectedColumn);
    setSearchText(value);
  };

  const handleDecline = async (key) => {
    try {
      const response = await fetch(`http://localhost:9036/leaves/${key}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Leave declined successfully');
        refreshTable();
      } else {
        console.error('Error declining leave:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const columns_approvedleaves = [
    {
      title: <div data-testid='id'>Id</div>,
      dataIndex: 'leave_id',
      key: 'leave_id',
      sorter: (a, b) => a.leave_id - b.leave_id,
    },
    {
        title: <div data-testid='employeeid'>Employee Id</div>,
        dataIndex: 'emp_id',
        key: 'emp_id',
        sorter: (a, b) => a.emp_id - b.emp_id,
      },
      {
        title: <div data-testid='leavetypeid'>Leave Type Id</div>,
        dataIndex: 'leave_type_id',
        key: 'leave_type_id',
        sorter: (a, b) => a.leave_type_id - b.leave_type_id,
      },
    {
      title: <div data-testid='startdate'>Start Date</div>,
      dataIndex: 'start_date',
      key: 'start_date',
      sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    },
    {
      title: <div data-testid='enddate'>End Date</div>,
      dataIndex: 'end_date',
      key: 'end_date',
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
    },
      {
        title: <div data-testid='decline'>Decline</div>,
        key: 'delete',
        width: 30,
        render: (record) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Popconfirm
              title="Are you sure to decline?"
              onConfirm={() => handleDecline(record.leave_id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<MinusCircleFilled />}
                size="small"
                data-testid='declinebutton'
              />
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
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Select
          defaultValue="emp_id"
          style={{ width: 150, marginRight: 8 }}
          onChange={value => setSearchColumn(value)}
        >
          <Option value="leave_id">Id</Option>
          <Option value="emp_id">Employee Id</Option>
          <Option value="leave_type_id">Leave Type Id</Option>
          <Option value="start_date">Start Date</Option>
          <Option value="end_date">End Date</Option>
        </Select>
        <Search
          placeholder={`Search ${searchColumn}`}
          onSearch={value => handleSearch(searchColumn, value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ flex:1 }}
        />
      </div>
      <Table columns={columns_approvedleaves} dataSource={filteredData} />
    </div>
  );
};

export default ApprovedLeaves;
