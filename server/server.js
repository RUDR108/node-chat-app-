 const path = require('path');
const http=require('http');
const express = require('express')
const publicPath = path.join(__dirname,'../public')
const socketIO = require('socket.io')
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const {Users}=require('./utils/users')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)
const port=process.env.PORT||3000
app.use(express.static(publicPath))
var users=new Users()

io.on('connection',(socket)=>{
    console.log('new user connected')

        socket.on('join',(params,callback)=>{
            if(!isRealString(params.name)|| !isRealString(params.room)){
              return callback('Name and room are required.')
            }

        
        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room)
            //socket.leave('dscjsdj')

            io.to(params.room).emit('updateUserList',users.getUserList(params.room))   
        socket.emit('newMessage',generateMessage('Admin',`You are welcome ${params.name}`))
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the room`))

            //io.emit---io.to('The office fans').emit() ---To every member in group 
            //socket.broadcast---socket.broadcast.to('The office fans') ---To
            //socket.emit --- soket.emit() --- to a specific user

            callback();
        })

        socket.on('createMessage',(message,callback)=>{
        var user = users.getUser(socket.id)
        
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))  
        }
       
        callback()
})

    socket.on('createLocationMessage',(coords)=>{
        var user=users.getUser(socket.id)
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude))   
        }
   
    })

    socket.on('disconnect',()=>{
        var user =users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit('UpdateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`))
        }
    })

})

server.listen(port,()=>{
        console.log(`listening at ${port}`)
})