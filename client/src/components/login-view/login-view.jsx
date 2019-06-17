/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password };
    console.log(user); // #TEST check if user details parsed
    // #TODO Send a request to the server for authentication
    // #TODO Then call props.onLoggedIn(username)
    props.onLoggedIn(user.username);
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={() => props.homeButton()}>
        Cancel
      </button>
    </div>
  );
}

// Define Proptypes
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  homeButton: PropTypes.func.isRequired,
};
