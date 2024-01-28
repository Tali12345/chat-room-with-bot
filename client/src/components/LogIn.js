import React from 'react';

function LogIn(props) {
  return (
    <div className="logIn">
      <div className="inputs">
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => {
            props.setUserName(e.target.value);
          }}
        />
      </div>
      <button onClick={props.connectToRoom}>Enter Chat</button>
    </div>)
}

export default LogIn;