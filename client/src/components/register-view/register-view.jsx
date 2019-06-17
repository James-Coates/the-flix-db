import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password };
    console.log(user); // #TEST check if user details parsed
    // #TODO Send a request to the server to add user
    // #TODO Then call props.onLoggedIn(username)
    props.onLoggedIn(user.username);
  };

  return (
    <div>
      Register
      <form>
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
      <button type="button" onClick={() => props.getMainView()}>
        Cancel
      </button>
    </div>
  );
}

// Define Proptypes
RegisterView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  getMainView: PropTypes.func.isRequired,
};
