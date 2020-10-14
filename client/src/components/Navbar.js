import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

export default function Navbar(props) {
  const { onLoginChange } = props;
  return (
    <nav>
      <Link className="home-link" to={'/'}>
        Film Fanatic
      </Link>
      <ul>
        <li>
          <Login onLoginChange={onLoginChange} />
        </li>
      </ul>
    </nav>
  );
}
