import React from 'react'
import TablesLeavesEmp from './Leave-Table'

export default function Leave(){
    const userid=1;
    return (
        <div>
            <p style={{ marginBottom: '20px', fontSize: '2rem', color: 'slate-800' }}>Leave</p>
            <div className='flex flex-col gap-14 max-h-screen overflow-y-auto pb-60'><TablesLeavesEmp userid={userid} /></div>
        </div>
    )
}