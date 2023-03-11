import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import useOnline from "utils/useOnline";
import PasswordReset from "scenes/PasswordReset/PasswordReset";
import ForgotPassword from "scenes/ForgotPassword/ForgotPassword";
import SocketContext from './utils/socket';
import { io } from 'socket.io-client';
import MessageWidget from "scenes/widgets/MessageWidget";
import UserChatWidget from "scenes/widgets/UserChatWidget";

// import Testing from "scenes/Testing/Testing";


function App() {
  const mode = useSelector((state) => state.mode);
  const userId = useSelector((state)=> state.user?._id)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const socket = useRef();

    useEffect(() => {
        // create a new socket connection if it doesn't exist
        if (!socket.current) {
            socket.current = io("ws://localhost:7001");
        }
        // send the user id to the server
        socket.current.emit('add_user', userId);

        // cleanup function to close the socket connection
        return () => {
            socket.current.disconnect();
        };
    }, [userId]);

  const isOnline = useOnline();
  if (!isOnline)
    return (
      <>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.error.main,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          You are offline. Please check your internet connection and try again.
        </Typography>
      </>
    );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SocketContext.Provider value={socket} >
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route path="/password-reset" element = {<PasswordReset/>}/>
            <Route path="/forgotpassword/:id/:token" element = {<ForgotPassword/>}/>
            <Route path= "/messages" element={<MessageWidget/>}/>
            <Route path="/chat/:id/:friendId" element={<UserChatWidget/>}/>

            {/* for testing purpose  */}
            {/* <Route path="/testing" element = {<Testing/>}/> */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
          </SocketContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;