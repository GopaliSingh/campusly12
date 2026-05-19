const express=require('express');
const app=express();
const hostrouter = require('./routes/hostrouter'); 
const userrouter = require('./routes/userrouter');
const port=3002;
const path=require('path');


//const db=require('./util/databaseutil');
// This tells Express to serve files from the 'public' folder
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views', ['views', 'store', 'host']);
app.use(express.urlencoded());
app.use(userrouter);
app.use(hostrouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); // This is the only closure you need

const server=app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



/*const io = require('socket.io')(server)
let socketsConected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  console.log('Socket connected', socket.id)
  socketsConected.add(socket.id)
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}
  */