import { createServer } from "http";
import { Server } from 'socket.io';
let io = null;

export const GET = async () => {
    console.log("get")
    if (!io) {
        console.log('*First use, starting Socket.IO');
        const httpServer = createServer();
        io = new Server(httpServer, {
            cors: {
                origin: ["http://localhost:3000"]
            }
        });
    
        io.on('connection', (socket) => {
            let tag = "SOCKETIO - "
            console.log(tag + `A client ${socket.id} connected`);
            socket.on('message', msg => {
                console.log(tag + `A client ${socket.id} say ${msg}`)
                io.emit('message', `reply to ${msg}`);
            });
            socket.on('disconnect', () => {
                console.log(tag + `A client ${socket.id} disconnected`);
            });
        });

        httpServer.listen("3001")
    
        return new Response("new socket built")
    }
    return new Response("socket server already working")
}