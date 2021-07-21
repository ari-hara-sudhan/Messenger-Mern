import React ,{forwardRef} from 'react'
import "./Message.css"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const  Message= forwardRef(({message,username,},ref)=> {
    const isUser= message.username===username;
    return (
    <div ref={ref} >
    <Card  className={`message ${isUser && "message__user"}`} >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         <div className="message__container">
         <p>{ !isUser && `${message.username||"unknown User"}` }  {message.message}</p>

             </div>   

        </Typography>
        </CardContent>
    </Card>
         
     
            
        </div>
    )
})

export default Message
