import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const columns_dashboard = [
  {
    title: <div data-testid='id'>Id</div>,
    dataIndex: 'LeaveId',
    key: 'LeaveId',
    sorter: (a, b) => a.LeaveId - b.LeaveId,
  },
  {
      title: <div data-testid='employeeid'>Employee Id</div>,
      dataIndex: 'EmpId',
      key: 'EmpId',
      sorter: (a, b) => a.EmpId - b.EmpId,
    },
    {
      title: <div data-testid='leavetypeid'>Leave Type Id</div>,
      dataIndex: 'LeaveType_id',
      key: 'LeaveType_id',
      sorter: (a, b) => a.LeaveType_id - b.LeaveType_id,
    },
  {
    title: <div data-testid='startdate'>Start Date</div>,
    dataIndex: 'StartDate',
    key: 'StartDate',
    sorter: (a, b) => a.StartDate.localeCompare(b.StartDate),
  },
  {
    title: <div data-testid='enddate'>End Date</div>,
    dataIndex: 'EndDate',
    key: 'EndDate',
    sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
  },
  {
    title: <div data-testid='status'>Status</div>,
    dataIndex: 'Approval_status',
    key: 'Approval_status',
    render: (approvalStatus) => {
      if (approvalStatus === false) {
        return 'Declined';
      }
      if (approvalStatus === true) {
        return 'Approved';
      }
      if (approvalStatus === null) {
        return 'Pending';
      }
      return approvalStatus;
    },
    sorter: (a, b) => {
      const statusOrder = { 'Approved': 1, 'Declined': 2, 'Pending': 3 };

      if (
        typeof a.Approval_status === 'boolean' ||
        typeof b.Approval_status === 'boolean' ||
        a.Approval_status === null ||
        b.Approval_status === null
      ) {
        const aValue = a.Approval_status === true ? 'Approved' :
                       a.Approval_status === false ? 'Declined' :
                       a.Approval_status === null ? 'Pending' : '';

        const bValue = b.Approval_status === true ? 'Approved' :
                       b.Approval_status === false ? 'Declined' :
                       b.Approval_status === null ? 'Pending' : '';

        return statusOrder[aValue] - (statusOrder[bValue]);
      } else {
        return a.Approval_status.localeCompare(b.Approval_status);
      }
    },
  }
];

const data_dashboard = [
  {
    key: '1',
    LeaveId: 1,
    EmpId: 1,
    LeaveType_id: 101,
    StartDate: '2024-07-01',
    EndDate: '2024-07-05',
    Approval_status: 'Approved',
  },
  {
    key: '2',
    LeaveId: 2,
    EmpId: 2,
    LeaveType_id: 102,
    StartDate: '2024-07-10',
    EndDate: '2024-07-15',
    Approval_status: 'Approved',
  },
  {
    key: '3',
    LeaveId: 3,
    EmpId: 3,
    LeaveType_id: 103,
    StartDate: '2024-08-01',
    EndDate: '2024-08-05',
    Approval_status: 'Pending',
  },
  {
    key: '4',
    LeaveId: 4,
    EmpId: 4,
    LeaveType_id: 104,
    StartDate: '2024-09-01',
    EndDate: '2024-09-10',
    Approval_status: 'Declined',
  },
  {
    key: '5',
    LeaveId: 5,
    EmpId: 5,
    LeaveType_id: 105,
    StartDate: '2024-10-01',
    EndDate: '2024-10-05',
    Approval_status: 'Approved',
  },
];

const TablesDashboard = ({datadash = data_dashboard}) => {
  const [data, setData] = useState(datadash);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch('http://localhost:9036/leaves');
      if (response.ok) {
        const leaves = await response.json();
        setData(leaves);
      } else {
        console.error('Failed to fetch leaves:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };
   return <Table columns={columns_dashboard} dataSource={data} />;
};

export default TablesDashboard;
