import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbarv() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/SignIn');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Task Manager</div>
      <div className="navbar-links">
        <Link to="/">Add Task</Link>
        <Link to="/tasks">View Tasks</Link>
        <button onClick={handleSignOut} className="signout-button">
         ⏻
        </button>
      </div>
    </nav>
  );
}

export default Navbarv;
