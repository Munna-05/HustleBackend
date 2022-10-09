import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import msgRouter from './routes/messages.js'
import convoRouter from './routes/convo.js'

import mongoose from 'mongoose';
import jw from 'jsonwebtoken'
import { Server } from 'socket.io'
import http from 'http'
import multer from 'multer'
import {dirname} from 'path'
import {join} from 'path'
import path from 'path'

// import msgRouter from './routes/messages.js'

const app = express();
const serv = http.createServer(express)


app.use(cors())
app.use(express.json())

dotenv.config()



const PORT = process.env.PORT || 5002



app.get('/', (req, res) => {
    res.send("api is running")
})

mongoose.connect(process.env.DB_CONNECTION_URL).then(() => {
    console.log("DataBase connection successfull")
}).catch(() => {
    console.log('Connection Error')
})


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/msg',msgRouter)
app.use('/uploads',express.static('./public/images'))



app.listen(PORT, console.log(`server started on port ${PORT}`))

//socket io

const io = new Server(serv, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
io.on("connection",(socket)=>{
console.log('user Connected = ', socket.id)
socket.on("disconnect",()=>{
    console.log('disconnected socket',socket.id)
})
})



export default io;