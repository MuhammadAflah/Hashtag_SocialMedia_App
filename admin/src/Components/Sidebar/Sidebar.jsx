import React from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import {} from '@mui/material'
import {Dashboard, PermIdentityOutlined, DynamicFeedOutlined, Logout} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';
import {Button} from '@mui/material';

function Sidebar() {
    const dispatch = useDispatch()

  return (
    <div className='sidebar'>
        <div className='top'>
            <span className='logo'>Admin</span>
        </div>
        <hr />
        <div className='center'>
            <ul>
                <Link to='/'>
                <li>
                    <Dashboard/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <Link to='/usermanage'>
                <li>
                    <PermIdentityOutlined/>
                    <span>User Management</span>
                </li>
                </Link>
                <Link to='/postmanage'>
                <li>
                    <DynamicFeedOutlined/>
                    <span>Post Management</span>
                </li>
                </Link>
                {/* <Link to='/adminlogin'> */}
                <li>
                    <Logout/>
                    <Button onClick={() => dispatch(setLogout())}>Logout</Button>

                </li>
                {/* </Link> */}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar