import { useState, useRef, useEffect } from 'react';

import socket from '../../socket';

const Chat = ({ users, messages, username, roomId, onAddMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesAreaRef = useRef(null);

  const handleSubmit = evt => {
    if (messageText) {
      socket.emit('ROOM:NEW_MESSAGE', {
        roomId,
        username,
        text: messageText
      });
      onAddMessage({ username, text: messageText });
      setMessageText('');
    }
    evt.preventDefault();
  };

  useEffect(() => {
    messagesAreaRef.current.scrollTo({
      top: messagesAreaRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__users users">
        <h2>Комната: {roomId}</h2>
        <b>Пользователи <span title="Количество пользователей онлайн">({users.length})</span>:</b>
        <ul className="users__list">
          {users.map((username, i) => <li key={username + i} className="users__item">{username}</li>)}
        </ul>
      </div>
      <div className="chat__main">
        <div className="chat__messages" ref={messagesAreaRef}>
          {messages.map((message, i) => (
            <div key={messageText.slice(0, 5) + i} className="message">
              <p className="message__text">{message.text}</p>
              <span className="message__username">{message.username}</span>
            </div>
          ))}
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
