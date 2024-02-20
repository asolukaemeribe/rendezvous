import { String } from 'aws-sdk/clients/appstream';
import { io } from 'socket.io-client'

const config = require('../config.json');
const socket = io(`http://${config.server_host}:${config.server_port}`);

socket.on('connect', () => {
    console.log(`You are connected to a WebSocket with SocketID: ${socket.id}`)
})

export function sendMessage(room: String, message: String) {
    socket.emit('send-message', room, message)
}