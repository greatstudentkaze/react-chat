import socket from '../socket';

const Join = () => {
  return (
    <div className="join">
      <label className="join__label">
        ID комнаты
        <input className="join__input" type="text" value="" placeholder="4444"/>
      </label>
      <label className="join__label">
        Никнейм
        <input className="join__input" type="text" value="" placeholder="gsk"/>
      </label>
      <button className="join__button button button--green">Войти</button>
    </div>
  )
};

export default Join;
