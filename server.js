const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const roomDatabase = new Map();

// Allows app to receive json data
app.use(express.json());

app.get('/rooms', (request, response) => {
  response.json(roomDatabase);
});

app.post('/rooms', (request, response) => {
  const { roomId, username } = request.body;

  if (!roomDatabase.has(roomId)) {
    roomDatabase.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []],
    ]));
  }

  response.send(); // send response status 200
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
