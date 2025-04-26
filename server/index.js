//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( express.js )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import express from 'express'
const app = express();
app.use(express.json())




//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( cors )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import cors from 'cors'
app.use(cors())





//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( env )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import dotenv from 'dotenv'
dotenv.config()





//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( imports )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { portPassword } from './middlewares/Password.middlewares.js';
import router from './routes/route.js';
import { connectDB } from './config/connectDatebaze.js';
import "./utils/cronCode.js"
import http from 'http'







//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( socket.io )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { Server } from 'socket.io';
import UserSchema from './schema/User.schema.js';
const server = http.createServer(app)
const io = new Server(server, {
      cors: {
            origin: "*",
            methods: '*'
      }
})

io.on('connection', async (so) => {
      so.on('isOnline', async (data) => {
            await UserSchema.findOneAndUpdate({ email: data.email }, { socketID: data.id })
            console.log(data);

      })

      so.on('disconnect', async () => {
            await UserSchema.findOneAndUpdate({ socket_id: so.id }, { socket_id: null })
      })
})



//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( constants )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const PORT = process.env.PORT || 3333






//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( connect date baze )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
connectDB()




//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( code start )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

app.use(`/`, portPassword, router)


//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( routes )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// app.use(`/`, portPassword, router)









//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( server port )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
server.listen(PORT, console.log(`✅ Server successfully working\n📡 Port:${PORT}\n`))