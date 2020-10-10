import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link className="home-link" to={'/'}>
        Film Fanatic
      </Link>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register" className="register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
