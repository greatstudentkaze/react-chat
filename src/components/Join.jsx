import { useState } from 'react';

import socket from '../socket';

const Join = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

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
      <button className="join__button button button--green">Войти</button>
    </div>
  )
};

export default Join;
