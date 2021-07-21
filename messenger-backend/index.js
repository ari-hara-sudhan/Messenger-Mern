import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Pusher from "pusher"
import Messages from "./messageModel.js"

const app =express()
const port =process.env.PORT || 8080

const pusher = new Pusher({
    appId: "1238439",
    key: "56943338b21abba9236f",
    secret: "f2d1adecf3d6f9b5a59a",
    cluster: "ap2",
    usetLS: true
  });
  

app.use(cors())
app.use(express.json())

const connection_url='mongodb+srv://admin:wEWECAgb9GOiFbnT@cluster0.zxlgq.mongodb.net/messenger?retryWrites=true&w=majority'

mongoose.connect(connection_url,{ 
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,

})

mongoose.connection.once('open',()=>{
    console.log("db is connected")

    const change= mongoose.connection.collection('messengers').watch()
    console.log(change)
    change.on('change',(change)=>{
        pusher.trigger('messenger','newmessages',{
            'change':change
        })
    })
})

app.get("/",(req,res)=>res.status(200).send("hello world"))


app.post("/message/new",(req,res)=>{
    const dbModel=req.body;

    Messages.create(dbModel,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/reterive/conversation',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
           data.sort((b,a)=>{
               return a.timestamp -b.timestamp
           })
        }
        res.status(200).send(data)
    })
})

app.listen(port,console.log(`the server is running on port ${port}`))