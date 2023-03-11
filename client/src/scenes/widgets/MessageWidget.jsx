// import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
// import WidgetWrapper from "components/WidgetWrapper";

// const MessageWidget = () => {
//   return (
//     <WidgetWrapper>
//       <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//         <Paper
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             px: 2,
//             py: 1,
//             backgroundColor: "#F5F5F5",
//           }}
//           elevation={0}
//         >
//           <Avatar src="https://via.placeholder.com/48" />
//           <Typography variant="h6">Username</Typography>
//         </Paper>
//         <Box
//           sx={{
//             flexGrow: 1,
//             overflowY: "scroll",
//             px: 2,
//             py: 1,
//           }}
//         >
//           {/* Chat messages */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 alignSelf: "flex-start",
//                 backgroundColor: "#E5E5EA",
//                 borderRadius: "10px",
//                 px: 2,
//                 py: 1,
//                 maxWidth: "70%",
//               }}
//             >
//               <Typography variant="body1">Message 1</Typography>
//             </Box>
//             <Box
//               sx={{
//                 alignSelf: "flex-end",
//                 backgroundColor: "#D6F4FF",
//                 borderRadius: "10px",
//                 px: 2,
//                 py: 1,
//                 maxWidth: "70%",
//               }}
//             >
//               <Typography variant="body1">Message 2</Typography>
//             </Box>
//             {/* Add more messages here */}
//           </Box>
//         </Box>
//         {/* Chat input */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             px: 2,
//             py: 1,
//           }}
//         >
//           <TextField
//             placeholder="Type your message here..."
//             sx={{
//               flexGrow: 1,
//               resize: "none",
//               borderRadius: "20px",
//               py: 1,
//               minHeight: "40px",
//             }}
//           />
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#2962FF",
//               color: "#FFFFFF",
//               borderRadius: "50%",
//               width: "40px",
//               height: "40px",
//               cursor: "pointer",
//             }}
//           >
//             SEND
//           </Button>
//         </Box>
//       </Box>
//     </WidgetWrapper>
//   );
// };

// export default MessageWidget;







import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {  Box, Button, Paper, TextField, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import SocketContext from "../../utils/socket";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatItem from './ChatItem';
import * as React from 'react';
import Navbar from 'scenes/navbar/Navbar';
import UserWidget from "scenes/widgets/UserWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import UserSuggestion from "scenes/widgets/UserSuggestion";

const MessageWidget = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const isMessage = useSelector((state) => state.isMessage);

    const [converstations, setConverstations] = React.useState([]);
    const token = useSelector((state) => state.token);
    const socket = React.useContext(SocketContext);
  
    
   
    
    React.useEffect(() => {
      
      socket.current?.on('get_users', users => {
        console.log(users);
      }) 
    },[])
  
    React.useEffect(() => {
      const getConverstations = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/conversation/${_id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            },
          });
              
          setConverstations(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      getConverstations()
    }, []);

    console.log('hiiiii');
  return (
    <>

    
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box m="2rem 0" />
          <UserSuggestion />
        </Box>
        {/* {isMessage?<MessageWidget/>:<Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
         }  */}
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

         {converstations?.map((chat) => {
                return (
                  <ChatItem
                    key={chat._id}
                    chat={chat}
                  />
                );
              })}
    </List>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
     </Box>
    
        </>
  );
}

export default MessageWidget