const http=require("http");
const express=require("express");
const cors=require("cors");
const socketIO=require("socket.io");

const app=express();
const port=4500 || process.env.PORT;

const users=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello World");
}) 

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("new connection");

    socket.on('joined',({user,roomID})=>{

        
        socket.join(roomID);
        
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`}) // visible to all other except the user who has joined
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat, ${users[socket.id]}`}) //only visible to the user who has joined
    })


    socket.on('message',({message,id,roomID})=>{
        io.to(roomID).emit('sendMessage',{user:users[id],message,id,roomID})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin", message:`${users[socket.id]} has left`});
        console.log('user left');
    })
    
});

server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})