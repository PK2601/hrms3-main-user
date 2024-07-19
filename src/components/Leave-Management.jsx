import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import { LoadingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import PendingLeaves from './PendingLeaves';
import ApprovedLeaves from './ApprovedLeaves';
import DeclinedLeaves from './DeclinedLeaves';

const LeaveManagement = () => {
  const [pendingleaves, setPendingLeaves] = useState([]);
  const [approvedleaves, setApprovedLeaves] = useState([]);
  const [declinedleaves, setDeclinedLeaves] = useState([]);

  const fetchPendingLeaves = async () => {
    try {
      const response = await fetch('http://localhost:9036/leaves/status?status=null');
      if (response.ok) {
        const data = await response.json();
        setPendingLeaves(data);
      } else {
        console.error('Failed to fetch pending leaves:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching pending leaves:', error);
    }
  };

  const fetchApprovedLeaves = async () => {
    try {
      const response = await fetch('http://localhost:9036/leaves/status?status=approved');
      if (response.ok) {
        const data = await response.json();
        setApprovedLeaves(data);
      } else {
        console.error('Failed to fetch approved leaves:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching approved leaves:', error);
    }
  };

  const fetchDeclinedLeaves = async () => {
    try {
      const response = await fetch('http://localhost:9036/leaves/status?status=declined');
      if (response.ok) {
        const data = await response.json();
        setDeclinedLeaves(data);
      } else {
        console.error('Failed to declined leaves:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching declined leaves:', error);
    }
  };

  const refreshTable = useCallback(async () => {
    await fetchPendingLeaves();
    await fetchApprovedLeaves();
    await fetchDeclinedLeaves();
  }, []);

  useEffect(() => {
    fetchPendingLeaves();
    fetchApprovedLeaves();
    fetchDeclinedLeaves();
  }, []);

  return(
  <Tabs>
    <Tabs.TabPane
      tab={
        <span>
          <LoadingOutlined style={{ marginRight: 8 }} data-testid='pendingleave'/>
          Pending Leave Applications
        </span>
      }
      key="1"
    >
      <PendingLeaves datapendingleaves = {pendingleaves} refreshTable = {refreshTable}/>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={
        <span>
          <CheckOutlined style={{ marginRight: 8 }} data-testid='approvedleave'/>
          Approved Leave Applications
        </span>
      }
      key="2"
    >
      <ApprovedLeaves dataapprovedleaves={approvedleaves} refreshTable={refreshTable}/>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={
        <span>
          <CloseOutlined style={{ marginRight: 8 }} data-testid='declinedleave'/>
          Declined Leave Applications
        </span>
      }
      key="3"
    >
      <DeclinedLeaves datadeclinedleaves={declinedleaves} refreshTable={refreshTable}/>
    </Tabs.TabPane>
  </Tabs>
  )
};

export default LeaveManagement;
