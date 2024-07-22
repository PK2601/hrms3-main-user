import React from 'react'
import classNames from 'classnames'
import { FcConferenceCall } from "react-icons/fc";
import { Sidebar_Links, Sidebar_Links_Bottom } from '../../lib/consts/navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { FcGrid } from "react-icons/fc";
import { FcLeave } from "react-icons/fc";

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar({setAdminLoggedIn, setUserLoggedIn, adminloggedIn, userloggedIn, username}){
    if (adminloggedIn){
    return (
        <div className='bg-slate-800 w-60 p-3 flex flex-col text-white'>
            <div className='flex items-center gap-6 px-1 py-3'>
            <FcConferenceCall fontSize={80}/>
            <span className='text-slate-300 text-xl'>Employee Management</span>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
                {Sidebar_Links.map((item) =>  (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                {Sidebar_Links_Bottom.map((item) =>  (
                    <SidebarLink key={item.key} item={item} setAdminLoggedIn={ setAdminLoggedIn } setUserLoggedIn={setUserLoggedIn}/>
                ))}
            </div>
        </div>
    )
    }
    else if (userloggedIn){
        const Sidebar_Links_User = [
            {
                key:'home',
                label:'Home',
                path:`/home/${username}`,
                icon:<FcGrid />
            },
            {
                key:'leave',
                label:'Leave',
                path:`/leave/${username}`,
                icon:<FcLeave />
            }
        ]
        return (
            <div className='bg-slate-800 w-60 p-3 flex flex-col text-white'>
                <div className='flex justify-center'>
                <FcConferenceCall fontSize={80}/>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    {Sidebar_Links_User.map((item) =>  (
                        <SidebarLink key={item.key} item={item} />
                    ))}
                </div>
                <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                    {Sidebar_Links_Bottom.map((item) =>  (
                        <SidebarLink key={item.key} item={item} setAdminLoggedIn={ setAdminLoggedIn } setUserLoggedIn={setUserLoggedIn}/>
                    ))}
                </div>
            </div>
        )
        }
}

function SidebarLink({item, setAdminLoggedIn, setUserLoggedIn}){

    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAdminLoggedIn(false);
        setUserLoggedIn(false);
        navigate('/', { replace: true });
    };

    const LogoutLink = () => (
        <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={handleLogout}
            okText="Yes"
            cancelText="No"
        >
            <div className={classNames('text-xl', pathname === item.path ? 'text-white' : '', linkClasses)} data-testid='logout'>
                {item.icon}
                {item.label}
            </div>
        </Popconfirm>
    );

    const RegularLink = () => (
        <Link to={item.path} className={classNames(pathname === item.path ? 'text-white' : '', linkClasses)}>
            <span className='text-xl'>
                {item.icon}
            </span>
            {item.label}
        </Link>
    );

    return item.key === 'logout' ? LogoutLink() : RegularLink();
}