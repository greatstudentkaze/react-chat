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

app.get('/rooms/:id', (request, response) => {
  const { id: roomId } = request.params;
  const data = roomDatabase.has(roomId)
    ? {
      users: [...roomDatabase.get(roomId).get('users').values()],
      messages: [...roomDatabase.get(roomId).get('messages').values()]
    }
    : { users: [], messages: [] };

  response.json(data);
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

io.of('/').on('connection', socket => {
  socket.on('ROOM:JOIN', ({ roomId, username }) => {
    socket.join(roomId);
    roomDatabase.get(roomId).get('users').set(socket.id, username);

    const users = [...roomDatabase.get(roomId).get('users').values()];
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, username, text }) => {
    const message = { username, text };

    roomDatabase.get(roomId).get('messages').push(message);
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', message);
  });

  socket.on('disconnect', () => {
    roomDatabase.forEach((room, roomId) => {
      if (room.get('users').delete(socket.id)) {
        const users = [...room.get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });

  console.log('user connected, socket id:', socket.id);
});

server.listen(4444, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('The server is running!');
});
