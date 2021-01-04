import { useReducer } from 'react';

import socket from './socket';
import reducer from './reducer';

import Join from './components/Join/Join';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    joined: false
  });

  const onLogin = () => {
    dispatch({
      type: 'JOINED',
      payload: true
    });
  };

  return (
    <div className="App">
      <div className="wrapper">
        {!state.joined && <Join onLogin={onLogin} />}
      </div>
    </div>
  );
}

export default App;
