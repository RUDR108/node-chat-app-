var socket=io();
socket.on('connect',function(){
    console.log('connected to server')

    socket.emit('createMessage',{
    from:'sdcsdc',
    text:'cdsc'
    })                                   
})

socket.on('disconnect',function(){
    console.log('disconnected')
})

socket.on('newMessage',(message)=>{
    console.log('New message',message)
})