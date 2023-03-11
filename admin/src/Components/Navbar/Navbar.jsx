// import React from 'react'
// import './Navbar.scss'
// import {SearchOutlined, DarkModeOutlined, NotificationsNoneOutlined, ChatBubbleOutlineOutlined, ListOutlined} from '@mui/icons-material'
// import {Avatar} from '@mui/material'
// import  setMode  from '../../state'
// import { useTheme } from '@mui/material'
// import { DarkMode } from '@mui/icons-material'
// import { LightMode } from '@mui/icons-material'
// import { useDispatch } from 'react-redux'

// function Navbar() {
//     // const dispatch = useDispatch()

//     // const theme = useTheme();
// //   const neutralLight = theme.palette.neutral.light;
// //   const dark = theme.palette.neutral.dark;
// //   const background = theme.palette.background.default;
// //   const primaryLight = theme.palette.primary.light;
// //   const alt = theme.palette.background.alt;

//   return (
//     <div className='navbar'>
//         <div className='wrapper'>
//             <div className='search'>
//                 <input type="text" placeholder='search...' />
//                 <SearchOutlined/>
//             </div>
//             <div className="items">
//                 <div className="item">
//                     {/* <DarkModeOutlined  onClick={() => dispatch(setMode())}>
//                     {theme.palette.mode === "dark" ? (
//                 <DarkMode sx={{ fontSize: "25px" }} />
//               ) : (
//                 <LightMode sx={{ color: dark, fontSize: "25px" }} />
//               )}
//                     </DarkModeOutlined> */}
//                     <DarkModeOutlined className='icon'/>
//                 </div>
//                 <div className="item">
//                     <NotificationsNoneOutlined className='icon'/>
//                     <div className='counter'>1</div>
//                 </div>
//                 <div className="item">
//                     <ChatBubbleOutlineOutlined className='icon'/>
//                     <div className='counter'>2</div>
//                 </div>
//                 <div className="item">
//                     <ListOutlined className='icon'/>
//                 </div>
//                 <div className="item">
//                 <Avatar sx={{width:30, height:30}} src='https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'/>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useState } from 'react';
import './Navbar.scss';
import {
  SearchOutlined,
  DarkModeOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
} from '@mui/icons-material';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { DarkMode } from '@mui/icons-material';
import { LightMode } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import setMode, { setLogout } from '../../state';

const settings = ['Logout'];

function Navbar() {
  const dispatch = useDispatch();

  
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='search...' />
          <SearchOutlined />
        </div>
        <div className='items'>
          <div className='item'>
            <DarkModeOutlined className='icon' onClick={() => dispatch(setMode())} />
          </div>
          <div className='item'>
            <NotificationsNoneOutlined className='icon' />
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineOutlined className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <ListOutlined className='icon' />
          </div>
          {/* <div className='item' tabIndex='0' onBlur={() => setDropdownVisible(false)}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src='https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className='dropdown'>
                <a href='#'>Logout</a>
              </div>
            )}
          </div> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight:3,  }}>
                <Avatar alt="Remy Sharp" src="https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => dispatch(setLogout())}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
