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






//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( constants )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const PORT = process.env.PORT || 3333






//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( connect date baze )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
connectDB()




//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( code start )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

app.use(`/`, portPassword, router)


//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( routes )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// app.use(`/`, portPassword, router)









//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( server port )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
app.listen(PORT, console.log(`✅ Server successfully working\n📡 Port:${PORT}\n`))