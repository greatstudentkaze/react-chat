import { useState } from 'react';

import socket from '../../socket';

import Error from './Error/Error';

const Join = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isError, setIsError] = useState(false);

  const onEnter = evt => {
    evt.target.classList.remove('button--error');

    if (!roomId || !username) {
      setIsError(true);
      evt.target.classList.add('button--error');
      return;
    } else {
      setIsError(false);
    }
    console.log(roomId, username);
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
      <button className="join__button button button--green" onClick={onEnter}>Войти</button>
      {isError && <Error />}
    </div>
  )
};

export default Join;
