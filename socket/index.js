import { Server } from 'socket.io';

const io = new Server(7001, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

let users = [];

const addUser = (userId, socketId) => {
    const existingUser = users.find(user => user.userId === userId);
    if (!existingUser) {
        const newUser = { userId, socketId };
        users.push(newUser);
        console.log('New user added:', newUser);
    } else {
        existingUser.socketId = socketId;
        console.log('Existing user updated:', existingUser);
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    const user = users.find(user => user.userId === userId);
    console.log('User found:', user);
    return user;
}

io.on('connection', (socket) => {

    // When connect
    console.log('a user conncted');

    // Take userID and socketId from user
    socket.on('add_user', userId => {
        addUser(userId, socket.id);
        io.emit('get_users', users);
    })

    // Send and Get Message
    socket.on("send_message", ({ senderId, receiverId, text }) => {

        console.log('Message received from', senderId, 'to', receiverId);
        const user = getUser(receiverId);
        console.log('User:', user);
        if (user) {
            io.to(user.socketId).emit('get_message', {
                senderId,
                text
            });
        }
    })

    // When disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('get_users', users);
    })
})