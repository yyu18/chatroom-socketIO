const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('index')
})

server = app.listen(3001,()=>console.log('app listening on port 3001')); 

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.username=null;
  socket.on('new_user',(data)=>{
    console.log(data);
    socket.username = data.userId;
    io.sockets.emit('new_user',{username:socket.username});
  })

  socket.on('new message', function(data){
    console.log(data);
    io.sockets.emit('new message',{message:data.message,username:socket.username});
  })
});