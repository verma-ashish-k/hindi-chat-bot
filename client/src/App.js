// create a react component that inputs a textarea message and then performs a fetch request to localhost:3001 gets back a response as a data.message and then displays that message in a box below

import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
      });
  };

  return (
    <div className='App'>
      <h1>Main Samay Hu....</h1>
      <h2>Pucho Vats Kya Puchna Chahte Ho !</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <b>Vats:</b>
          <textarea
            className='textbox'
            value={message}
            onChange={handleChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
      {response && (
        <div>
          <b>Samay:</b>
          {response}
        </div>
      )}
      <div></div>
    </div>
  );
}

export default App;
