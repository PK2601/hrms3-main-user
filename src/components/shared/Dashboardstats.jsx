import React, { useState, useEffect, useCallback  } from 'react';
import { FaBriefcase } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { HiBuildingLibrary } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";

function Dashboardstats(){
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

    return(
        <div className="w-full">
            <div className="flex gap-4 mb-5">
                <BoxWrapper>
                    <FaBriefcase className="text-5xl text-white mx-auto"/>
                    <div className="text-center mt-2">
                        <div className="text-white text-3xl">Available Leave Types</div>
                    </div>
                    <div className="text-white text-5xl mt-auto">{availableleavetypes}</div>
                </BoxWrapper>
                <BoxWrapper>
                    <GrUserManager className="text-5xl text-white mx-auto"/>
                    <div className="text-center mt-2">
                        <div className="text-white text-3xl">Employees</div>
                    </div>
                    <div className="text-white text-5xl mt-auto">{availableemployees}</div>
                </BoxWrapper>
                <BoxWrapper>
                    <HiBuildingLibrary className="text-5xl text-white mx-auto"/>
                    <div className="text-center mt-2">
                        <div className="text-white text-3xl">Available Departments</div>
                    </div>
                    <div className="text-white text-5xl mt-auto">{availabledepartments}</div>
                </BoxWrapper>
            </div>
            <div className="flex gap-4">
                <BoxWrapper>
                    <AiOutlineLoading3Quarters className="text-5xl text-white mx-auto"/>
                    <div className="text-center mt-2">
                        <div className="text-white text-3xl">Pending Applications</div>
                    </div>
                    <div className="text-white text-5xl mt-auto">{availablependingleaves}</div>
                </BoxWrapper>
                <BoxWrapper>
                    <TiTickOutline className="text-5xl text-white mx-auto"/>
                    <div className="text-center mt-2">
                        <div className="text-white text-3xl">Approved Applications</div>
                    </div>
                    <div className="text-white text-5xl mt-auto">{availableapprovedleaves}</div>
                </BoxWrapper>
                <BoxWrapper>
                    <ImCross className="text-5xl text-white mx-auto"/>
                    <div className="text-center mt-2">
                        <div className="text-white text-3xl">Declined Applications</div>
                    </div>
                    <div className="text-white text-5xl mt-auto">{availabledeclinedleaves}</div>
                </BoxWrapper>
            </div>
        </div>
    )
}

export default Dashboardstats

function BoxWrapper({children}){
    return (
        <div className="bg-slate-800 rounded-sm p-4 flex-1 border border-gray-200 flex flex-col items-center justify-between h-60 text-white">
            {children}
        </div>
    )
}
