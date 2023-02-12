import classNames from 'classnames';
import React, { useState } from 'react';
import addContactHandler from '../../helpers/addContactHandler';

export default function Contacts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const contactHanler = (e: React.FormEvent<HTMLFormElement>) => {
    addContactHandler(
      e,
      name,
      email,
      message,
      setNotification,
    );
    resetForm();
  };

  return (
    <form
      onSubmit={contactHanler}
      style={{ maxWidth: '600px' }}
    >
      <h1 className="title has-text-centered">Please write your message</h1>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <label htmlFor="name" className="label">
              Name
              <input
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                className="input"
                type="text"
                placeholder="Your Name"
              />
            </label>
          </div>
          <div className="field">
            <label htmlFor="email" className="label">
              E-Mail
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                className="input"
                type="email"
                placeholder="Your Email"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="massage" className="label">
          Message
          <div className="control">
            <textarea
              required
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              id="message"
              className="textarea"
              placeholder="Textarea"
            />
          </div>
        </label>
      </div>
      <div className="buttons">
        <button type="submit" className="button is-dark">
          Submit Contact
        </button>
      </div>
      {notification && (
        <div className={classNames(
          'notification',
          {
            'is-success': notification === 'ok',
            'is-danger': notification === 'error',
          },
        )}
        >
          <button
            onClick={() => {
              setNotification('');
            }}
            type="button"
            className="delete"
            aria-label="contactSubmit"
          />
          {notification === 'ok' && 'Your message has been sent sucsefully'}
          {notification === 'error' && 'Failed to send message'}
        </div>
      )}
    </form>
  );
}
