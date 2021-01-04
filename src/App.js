import { useReducer, useEffect } from 'react';
import axios from 'axios';

import socket from './socket';
import reducer from './reducer';

import Join from './components/Join';
import Chat from './components/Chat';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    username: null,
    users: [],
    messages: []
  });

  const onLogin = async data => {
    dispatch({
      type: 'JOINED',
      payload: data
    });

    socket.emit('ROOM:JOIN', data);
    const { data: responseData } = await axios.get(`/rooms/${data.roomId}`)
      .catch(err => console.error(err));

    setUsers(responseData.users);
  };

  const setUsers = users => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        {!state.joined ? <Join onLogin={onLogin} /> : <Chat users={state.users} messages={state.messages} />}
      </div>
    </div>
  );
}

export default App;
