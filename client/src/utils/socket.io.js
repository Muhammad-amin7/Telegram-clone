import { io } from "socket.io-client"
export const socket = io('http://localhost:3333')


export const send_socketID = (email) => {
      socket.emit("isOnline", { id: socket.id, email: email })
      console.log(socket.id);
}