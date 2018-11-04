const path = require('path');
const http=require('http');
const express = require('express')
const publicPath = path.join(__dirname,'../public')
const socketIO = require('socket.io')

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

const port=process.env.PORT||3000
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log('new user connected')

    // socket.emit('newMessage',{
    //     from:'weed',
    //     text:'csdcsdc',
    //     createdAt:124
    // })

    socket.on('createMessage',(message)=>{
        console.log('created message',message)

        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
    })

    socket.on('disconnect',()=>{
        console.log('connection ended.')
    })

})

server.listen(port,()=>{
        console.log(`listening at ${port}`)
})