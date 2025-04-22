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






//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( constants )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const PORT = process.env.PORT || 3333





//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( code start )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

app.use(`/`, portPassword, (requset, response) => {
      response.status(200).send("✅✅✅")
})






//  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-((( server port )))-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
app.listen(PORT, console.log(`✅ Server successfully working\n📡 Port:${PORT}\n`))