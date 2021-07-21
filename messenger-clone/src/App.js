import React,{useState,useEffect} from 'react'
import "./App.css"
import Message from './Message';
import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import FlipMove from "react-flip-move";
import axios from "./axios"
import Pusher from "pusher-js"
function App() {
  const[input,setInput]=useState();
  const [messages,setMessages]=useState([
]);
const[username,setUsername]=useState();
const  pusher = new Pusher('56943338b21abba9236f', {
  cluster: 'ap2'
});

  const sync=async()=>{
    await axios.get('/reterive/conversation').then((res)=>{
      console.log(res.data)
      setMessages(res.data)
    })
    

  }
  useEffect(()=>{
    
    const  channel = pusher.subscribe('messengers');
    channel.bind('newmessages', function(data) {
      sync();
    });
  
  },[username]);

  const sendMessage=(e)=>{
    e.preventDefault();
  
    axios.post("/message/new",{
      username:username,
      message:input,
      timestamp:Date.now()

    })
    setInput("");
  }

  useEffect(()=>{
    setUsername(prompt("Enter ur Name.."));

  },[])
  return (

    <div className="app">
      <img className='app__logo' src="https://messengernews.fb.com/wp-content/themes/messenger/images/messenger_logo_1200x630.jpg" alt="message-logo"/>
      <form className="app__form">
      <TextField className="app__input" autoComplete="off" id="standard-basic" label="Enter the Messages..." value={input} onChange={e=>setInput(e.target.value)} />
      <Button className="app__butto" variant="contained" type="submit" disabled={!input} onClick={sendMessage} >send</Button>
      </form>

 
     <FlipMove>
     {
        messages.map(message =>(
          <Message key={message._id} id={message._id} username={username} message={message}/>
        ))
      }
     </FlipMove>
     
    </div>
  )
}

export default App
