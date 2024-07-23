import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'antd';
import EmployeeLeaveAdd from './Add-Leave';

const columns_leave_emp = [
  {
    title: <div data-testid='id'>Id</div>,
    dataIndex: 'leave_id',
    key: 'leave_id',
    sorter: (a, b) => a.leave_id - b.leave_id,
  },
  // {
  //     title: <div data-testid='employeeid'>Employee Id</div>,
  //     dataIndex: 'emp_id',
  //     key: 'emp_id',
  //     sorter: (a, b) => a.emp_id - b.emp_id,
  //   },
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
    title: <div data-testid='status'>Status</div>,
    dataIndex: 'approval_status',
    key: 'approval_status',
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
        typeof a.approval_status === 'boolean' ||
        typeof b.approval_status === 'boolean' ||
        a.approval_status === null ||
        b.approval_status === null
      ) {
        const aValue = a.approval_status === true ? 'Approved' :
                       a.approval_status === false ? 'Declined' :
                       a.approval_status === null ? 'Pending' : '';

        const bValue = b.approval_status === true ? 'Approved' :
                       b.approval_status === false ? 'Declined' :
                       b.approval_status === null ? 'Pending' : '';

        return statusOrder[aValue] - (statusOrder[bValue]);
      } else {
        return a.approval_status.localeCompare(b.approval_status);
      }
    },
  }
];

const data_leave_emp = [
  {
    key: '1',
    leave_id: 1,
    emp_id: 1,
    leave_type_id: 101,
    start_date: '2024-07-01',
    end_date: '2024-07-05',
    approval_status: 'Approved',
  },
  {
    key: '2',
    leave_id: 2,
    emp_id: 1,
    leave_type_id: 102,
    start_date: '2024-07-10',
    end_date: '2024-07-15',
    approval_status: 'Approved',
  },
];

const TablesLeavesEmp = ({dataleaveemp = data_leave_emp, userid}) => {
  const [data, setData] = useState(dataleaveemp);

  const refreshTable = useCallback(async () => {
    await fetchLeavesEmp(userid);
  }, [userid]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  const fetchLeavesEmp = async (key) => {
    try {
      const response = await fetch(`http://localhost:9036/leaves/${key}`);
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
   return (
    <div>
    <div style={{ marginBottom: 16, marginLeft: 5, marginTop:16 }}>
        <EmployeeLeaveAdd refreshTable={refreshTable} userid={userid}/>
      </div>
   <Table columns={columns_leave_emp} dataSource={data} />
   </div>
   );
};

export default TablesLeavesEmp;
