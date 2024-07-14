import React from 'react';

const NavBar = ({ user }) => {
  return (
    <nav className="nav-bar">
      <h1>Bean Talk</h1>
      <div style={{ display: 'flex' }}>
        <div className="chat-bubble__left">
          {user.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <div
              className="user-message-circle"
              style={{ backgroundColor: 'lightgray' }}>
              {user.name.charAt(0)}
            </div>
          )}
        </div>
        <h4 style={{ marginTop: '0.3rem' }}>{user.name}</h4>
      </div>
    </nav>
  );
};

export default NavBar;
