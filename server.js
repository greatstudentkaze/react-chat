const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const roomDatabase = new Map();

app.get('/rooms', (request, response) => {
  response.json(roomDatabase);
});

io.of('/').use((socket, next) => {
  console.log('user connected, socket id:', socket.id)
});

server.listen(4444, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('The server is running!');
});
