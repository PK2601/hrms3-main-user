import React, { useState, useCallback, useEffect } from 'react';
import { Carousel } from 'antd';
import { BackgroundGradientAnimationDemo } from './BackgroundGradientAnimation';


const contentStyle = {
  height: '260px',
  color: '#fff',
  //lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: 'normal',
};

const containerStyle = {
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  position: 'relative',
};


function Dashboardstatsalternative () {
    const [availableleavetypes, setAvailableLeaveTypesData] = useState('0');
    const [availableemployees, setAvailableEmployees] = useState('0');
    const [availabledepartments, setAvailableDepartments] = useState('0');
    const [availablependingleaves, setAvailablePendingLeaves] = useState('0');
    const [availableapprovedleaves, setAvailableApprovedLeaves] = useState('0');
    const [availabledeclinedleaves, setAvailableDeclinedLeaves] = useState('0');

    const fetchAvailableLeaveTypes = async () => {
        try {
          const response = await fetch('http://localhost:9036/leavetypes/count');
          if (response.ok) {
            const leavetypes = await response.json();
            setAvailableLeaveTypesData(leavetypes.count);
          } else {
            console.error('Failed to fetch available leave types:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching available leave types:', error);
        }
      };

      const fetchAvailableEmployees = async () => {
        try {
          const response = await fetch('http://localhost:9036/employees/count');
          if (response.ok) {
            const employees = await response.json();
            setAvailableEmployees(employees.count);
          } else {
            console.error('Failed to fetch available employees:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching available employees:', error);
        }
      };

      const fetchAvailableDepartments = async () => {
        try {
          const response = await fetch('http://localhost:9036/departments/count');
          if (response.ok) {
            const departments = await response.json();
            setAvailableDepartments(departments.count);
          } else {
            console.error('Failed to fetch available departments:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching available departments:', error);
        }
      };

      const fetchAvailablePendingLeaves = async () => {
        try {
          const response = await fetch('http://localhost:9036/leaves/pending/count');
          if (response.ok) {
            const pendingleaves = await response.json();
            setAvailablePendingLeaves(pendingleaves.count);
          } else {
            console.error('Failed to fetch available pending leaves:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching available pending leaves:', error);
        }
      };

      const fetchAvailableApprovedLeaves = async () => {
        try {
          const response = await fetch('http://localhost:9036/leaves/approved/count');
          if (response.ok) {
            const approvedleaves = await response.json();
            setAvailableApprovedLeaves(approvedleaves.count);
          } else {
            console.error('Failed to fetch available approved leaves:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching available approved leaves:', error);
        }
      };

      const fetchAvailableDeclinedLeaves = async () => {
        try {
          const response = await fetch('http://localhost:9036/leaves/declined/count');
          if (response.ok) {
            const pendingleaves = await response.json();
            setAvailableDeclinedLeaves(pendingleaves.count);
          } else {
            console.error('Failed to fetch available declined leaves:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching available declined leaves:', error);
        }
      };

    const refreshTable = useCallback(async () => {
        await fetchAvailableLeaveTypes();
        await fetchAvailableEmployees();
        await fetchAvailableDepartments();
        await fetchAvailablePendingLeaves();
        await fetchAvailableApprovedLeaves();
        await fetchAvailableDeclinedLeaves();
    }, []);
    
    useEffect(() => {
        refreshTable();
    }, [refreshTable]);

    return (
        <div style={containerStyle}>
          <Carousel autoplay effect="fade" arrows infinite={false}>
            <div>
            <div style={contentStyle}>
            <BackgroundGradientAnimationDemo title={"Leave Types"} number={availableleavetypes}></BackgroundGradientAnimationDemo>
              </div>
            </div>
            <div>
            <div style={contentStyle}>
            <BackgroundGradientAnimationDemo title={"Employees"} number={availableemployees}></BackgroundGradientAnimationDemo>
              </div>
            </div>
            <div>
            <div style={contentStyle}>
            <BackgroundGradientAnimationDemo title={"Departments"} number={availabledepartments}></BackgroundGradientAnimationDemo>
              </div>
            </div>
            <div>
            <div style={contentStyle}>
            <BackgroundGradientAnimationDemo title={"Pending Leaves"} number={availablependingleaves}></BackgroundGradientAnimationDemo>
              </div>
            </div>
            <div>
            <div style={contentStyle}>
            <BackgroundGradientAnimationDemo title={"Approved Leaves"} number={availableapprovedleaves}></BackgroundGradientAnimationDemo>
              </div>
            </div>
            <div>
            <div style={contentStyle}>
            <BackgroundGradientAnimationDemo title={"Declined Leaves"} number={availabledeclinedleaves}></BackgroundGradientAnimationDemo>
              </div>
            </div>
          </Carousel>
        </div>
    );
};

export default Dashboardstatsalternative;
