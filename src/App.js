import { useReducer, useEffect } from 'react';

import socket from './socket';
import reducer from './reducer';

import Join from './components/Join/Join';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    username: null
  });

  const onLogin = (data) => {
    dispatch({
      type: 'JOINED',
      payload: data
    });

    socket.emit('ROOM:JOIN', data);
  };

  useEffect(() => {
    socket.on('ROOM:JOINED', users => {
      console.log('new user', users)
    });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        {!state.joined && <Join onLogin={onLogin} />}
      </div>
    </div>
  );
}

export default App;
