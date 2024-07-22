import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({setAdminLoggedIn, setUserLoggedIn, adminloggedIn, userloggedIn, username}){
    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
            <Sidebar setAdminLoggedIn={setAdminLoggedIn} setUserLoggedIn={setUserLoggedIn} adminloggedIn={adminloggedIn} userloggedIn={userloggedIn} username={username}/>
            <div className='flex-1'>
            <Header adminloggedIn={adminloggedIn} userloggedIn={userloggedIn} username={username}/>
            <div className='p-4'>{<Outlet/>}</div>
            </div>
        </div>
    )
}