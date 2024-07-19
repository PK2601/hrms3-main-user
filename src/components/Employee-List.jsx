import React from 'react'
import TablesEmp from './shared/Employee-Table'
//import EmployeeAdd from './Add-Employee'

export default function EmployeeList(){
    return (
        <div>
            <p style={{ marginBottom: '20px', fontSize: '1.5rem', color: 'slate-800' }}>Employee List</p>
            {/* <div className='flex flex-row gap-4'>
            <div style={{ marginBottom: '15px' }}><EmployeeAdd  /></div>
            </div> */}
            <div className='flex flex-col gap-14 max-h-screen overflow-y-auto pb-60'><TablesEmp /></div>
        </div>
    )
}