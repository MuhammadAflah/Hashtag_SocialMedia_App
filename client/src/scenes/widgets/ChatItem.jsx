import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ChatItem = ({chat}) => {

    const [user, setUser] = useState(null);
    const currentUser = useSelector((state)=>state.user._id)
    const token = useSelector((state)=>state.token)
    const friendId = chat.members.find(m => m !== currentUser);
   console.log(user);
    useEffect(() => {
        
        const getUser = async () => {
            try {
                
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${friendId}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                
                setUser(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        getUser();
    },[token])

    return (
        <Box >
          <Link to={`/chat/${chat._id}/${friendId}`} style={{ textDecoration: 'none', color: "inherit" }}>
          <ListItem>
              <ListItemButton>
                  <ListItemAvatar>
                      <Avatar
                          alt={`Avatar `}
                          src={user?.picturePath}
                      />
                  </ListItemAvatar>
                  <ListItemText primary={user?.firstName} />
              </ListItemButton>
              </ListItem>
          </Link>
          <Divider />
      </Box>
    )
}

export default ChatItem