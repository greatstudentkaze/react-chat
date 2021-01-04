import { useState } from 'react';
import axios from 'axios';

import socket from '../../socket';

import Error from './Error/Error';

const Join = ({ onLogin }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onEnter = async evt => {
    evt.target.classList.remove('button--error');

    if (!roomId || !username) {
      setIsError(true);
      evt.target.classList.add('button--error');
      return;
    }

    setIsError(false);
    setLoading(true);
    await axios.post('/rooms', {roomId, username});
    onLogin();
  };

  return (
    <div className="join">
      <label className="join__label">
        ID комнаты
        <input className="join__input" type="text" value={roomId} onChange={evt => setRoomId(evt.target.value)} placeholder="4444"/>
      </label>
      <label className="join__label">
        Никнейм
        <input className="join__input" type="text" value={username} onChange={evt => setUsername(evt.target.value)} placeholder="gsk"/>
      </label>
      <button className="join__button button button--green" onClick={onEnter} disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
      {isError && <Error />}
    </div>
  )
};

export default Join;
