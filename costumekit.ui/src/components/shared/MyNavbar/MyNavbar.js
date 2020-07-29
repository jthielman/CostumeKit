import React from 'react';
import { Link } from 'react-router-dom';

import './MyNavbar.scss';

const MyNavbar = () => (
  <div className="MyNavbar">
    <nav className="navbar navbar-expand-sm navbar-light">
      <Link to="/" className="brand"><h1>Costume Kit</h1></Link>
      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/garments">Garments</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default MyNavbar;
