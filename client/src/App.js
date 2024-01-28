import './App.css';
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import LogIn from './components/LogIn';
import Chat from './components/Chat';

let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  const room = "Room";
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT, {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
    socket.on("get_previous_messages", (previousMessages) => {
      setMessageList(previousMessages);
    });
  };

  return (
    <div className="App">
      {!loggedIn ?
        <LogIn setUserName={setUserName} connectToRoom={connectToRoom}></LogIn> :
        <Chat setMessageList={setMessageList} messageList={messageList} userName={userName} room={room} socket={socket}></Chat>}
    </div>)
}

export default App;