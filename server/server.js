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
  var people = {};

  socket.on('username',function(user){
    people[user] = socket.id;
    console.log(people);
  })

  socket.on('clientname',function(client){
    people[client] = socket.id;
  })

  socket.on('chatMessage', function(message){
      console.log(message);
      io.to(people[message.receiver]).emit('chatMessage',message.message);
  })

});