import React, { useState, useCallback, useEffect } from 'react';
import PopoverDemo from './Notification';

export default function Header({adminloggedIn, userloggedIn, username}){
    const [name, setName] = useState('');

    const fetchEmployees = useCallback(async (userid) => {
        try {
            const response = await fetch(`http://localhost:9036/employees/${userid}`);
            if (response.ok) {
                const employees = await response.json();
                setName(employees.name);
            } else {
                console.error('Failed to fetch employee name:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching employee name:', error);
        }
    }, []);

    useEffect(() => {
        if (userloggedIn) {
            fetchEmployees(username);
        }
    }, [userloggedIn, username, fetchEmployees]);

    if (adminloggedIn){
        return(
            <div className='bg-slate-600 h-14 p-4 text-white flex justify-between items-center'>
                Employee Leave Management System
                <PopoverDemo />
            </div>
        )
    }
    else if (userloggedIn){
        return(
            <div className='bg-slate-600 h-14 p-4 text-white flex justify-between items-center'>
                Welcome {name}
                <PopoverDemo />
            </div>
        )
    }
}