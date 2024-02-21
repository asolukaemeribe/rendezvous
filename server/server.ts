const express = require('express');
const io = require('socket.io');
const http = require('http');
const cors = require('cors');
const serverConfig = require('./config');
const routes = require('./routes.ts');

const app = express();
const server = http.createServer(app);
const socketIO = io(server);

app.use(cors({
    origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/user/:uid', routes.user);
app.get('/newuser', routes.createuser);
app.get('/newuserlocation', routes.createuserlocation);
app.get('/getusersinradius', routes.getusersinradius);
app.get('/updateuserlocation', routes.updateuserlocation);
app.get('/updateimage', routes.updateuserprofilepic);
app.get('/getimage', routes.getnameageimage);

app.get('/', (req, res) => {
    res.send('Rendezvous Server made with Express');
});

// socket io
io.on('connection', socket => { /* user is connected */
    console.log("User " + socket.id + " is connected!")
    socket.on('send-message', (room: String, message: String) => {
        console.log("Sent message has been received! Redirecting to room: " + room + "Message is: " + message)
        socket.to(room).emit('receive-message', message)
    })
    socket.on('join-room', room => {
        socket.join(room)
    })
});

server.listen(serverConfig.server_port, () => {
    console.log(`Server running at http://${serverConfig.server_host}:${serverConfig.server_port}/`)
});
