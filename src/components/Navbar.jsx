import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="navbar-brand">
        SymReact
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/clients" className="nav-link">
              Clients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/factures" className="nav-link">
              Factures
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
