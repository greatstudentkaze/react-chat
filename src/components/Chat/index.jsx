import { useState } from 'react';

const Chat = () => {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = evt => {
    console.log(messageText);
    evt.preventDefault();
  };

  return (
    <div className="chat">
      <div className="chat__users users">
        <b>Users (1):</b>
        <ul className="users__list">
          <li className="users__item">Test User</li>
          <li className="users__item">Test User</li>
          <li className="users__item">Test User</li>
          <li className="users__item">Test User</li>
        </ul>
      </div>
      <div className="chat__main">
        <div className="chat__messages">
          <div className="message">
            <p className="message__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis hic incidunt placeat.</p>
            <span className="message__username">Test User</span>
          </div>
          <div className="message">
            <p className="message__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis hic incidunt placeat.</p>
            <span className="message__username">Test User</span>
          </div>
        </div>
        <form className="chat__form" onSubmit={handleSubmit}>
          <textarea className="chat__textarea" value={messageText} onChange={evt => setMessageText(evt.target.value)}>s</textarea>
          <button className="button button--purple-border chat__button" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
