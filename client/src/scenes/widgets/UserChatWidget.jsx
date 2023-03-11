import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import React, { useEffect, useRef, useState, useContext } from 'react';
// import UploadImage from "../UploadImage/UploadImage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import SocketContext from "../../utils/socket";
import MessageWidget from "./MessageWidget";
import Navbar from "scenes/navbar/Navbar";
import UserWidget from "./UserWidget";
import UserSuggestion from "./UserSuggestion";
import FriendListWidget from "./FriendListWidget";
import { useMediaQuery } from "@mui/material";
import Message from "./Message";
import { Send } from "@mui/icons-material";

const UserChatWidget = () => {

    console.log("open");

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const isMessage = useSelector((state) => state.isMessage);

    const [openImageUpload, setImageUpload] = useState(false);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const { id } = useParams();
    const { friendId } = useParams();
    const [friend, setFriend] = useState(null);
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const scrollRef = useRef();
    const socket = useContext(SocketContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: userId,
            text: newMessage,
            converstationId: id
        }

        socket.current?.emit('send_message', {
            senderId: userId,
            receiverId: friendId,
            text: newMessage
        })

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/message`, message, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
            console.log(res);
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        socket.current?.on('get_message', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && friendId === arrivalMessage.sender &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        const getMessags = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/message/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        getMessags();
    }, []);


    useEffect(() => {

        const getUser = async () => {
            try {

                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${friendId}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                setFriend(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        getUser();
    }, [token])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])



    return (



        <Box>
            <Navbar />
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
            
                <Box flex={4} sx={{ marginLeft: "1rem" }}>
                    <Card sx={{
                        boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                        height: "90vh",
                        width: "99%",
                    }} >
                        <CardHeader

                            avatar={
                                <Avatar
                                    alt={`Avatar `}
                                    src={friend?.picturePath}
                                />
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={friend?.firstName}
                            subheader="online"
                        />
                        <Box sx={{
                            backgroundColor: "#f0f5f5",
                            height: "calc(100% - 8rem)",
                            paddingLeft: "1rem",
                            overflowX: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>

                            <Box>
                                {messages &&
                                    messages.map((msg) => {
                                        return (
                                            <Box ref={scrollRef} key={msg?._id}>
                                                <Message msg={msg} />
                                            </Box>
                                        )
                                    })}

                            </Box>
                        </Box>
                        <Box sx={{

                            display: "flex",
                            backgroundColor: "#f0f5f5",
                        }}>
                            <Box sx={{
                                height: "4rem",
                                width: "100%",
                                display: "flex",
                                paddingLeft: "1rem"

                            }}>
                                <OutlinedInput
                                    sx={{
                                        padding: "1rem",
                                        backgroundColor: "white",
                                        borderRadius: "20px"
                                    }}
                                    placeholder="Type here"
                                    multiline
                                    fullWidth
                                    onChange={e => setNewMessage(e.target.value)}
                                    value={newMessage}
                                    inputProps={{ 'aria-label': 'Type Message' }}
                                />
                                {/* <Box sx={{
                            paddingTop: "1rem",
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "black",
                            }
                        }}
                        onClick={e=>setImageUpload(true)}
                        >
                            <AttachFileRoundedIcon color="gray" />
                        </Box> */}
                            </Box>
                            <Send
                                onClick={handleSubmit}
                                sx={{
                                    // backgroundColor: "#bc80d4",
                                    padding: "1rem",
                                    paddingLeft: "1rem",
                                    // borderRadius: "100%",
                                    color: "black",
                                    marginInline: "1rem",
                                    cursor: "pointer",
                                    "&:hover": {
                                        // backgroundColor: "green",
                                        color: "blue",
                                    }

                                }} />
                        </Box>
                        {/* <UploadImage open={openImageUpload} setOpen={setImageUpload} /> */}

                    </Card>
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        {/* <AdvertWidget /> */}
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default UserChatWidget
