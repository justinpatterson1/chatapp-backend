import express from 'express';
import mongoose from 'mongoose';
import userController from './controller/userController.js'
import messageController from './controller/messageController.js'
import conversationController from './controller/conversationController.js'
import cookieParser from 'cookie-parser';
import "dotenv/config"
import cors from 'cors'


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(express.json())


const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    credentials: true // Required for cookies, authorization headers
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
const{MONGODBCONNECTION} = process.env

app.use("/user",userController)
app.use("/message",messageController)
app.use("/conversation",conversationController)

app.listen(3000,()=>{
    mongoose.connect(MONGODBCONNECTION)
        .then(()=>{
            console.log("Connection to Mongo was successful")
        })
        .catch(err=>{
            console.log(err)
        })
})
