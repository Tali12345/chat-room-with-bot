import React, { useState } from "react";
import Reply from "./Reply";

function Chat(props) {

    const [message, setMessage] = useState("");
    const [replyMessageIndex, setReplyMessageIndex] = useState(-1);

    const sendMessage = async () => {
        let messageContent = {
            room: props.room,
            content: {
                author: props.userName,
                message: message,
                reply: replyMessageIndex,
            },
        };

        setMessage("");
        setReplyMessageIndex(-1);
        await props.socket.emit("send_message", messageContent);
        props.setMessageList([...props.messageList, messageContent.content]);
    };

    function handleClickReply(event) {
        var { id } = event.target;
        if (replyMessageIndex === id) {
            setReplyMessageIndex(-1);
        } else {
            setReplyMessageIndex(id);
        }
    }

    return (
        <div className="chatContainer">
            <div className="messages">
                {props.messageList.map((val, index) => {
                    return (
                        <div
                            className="messageContainer"
                            id={val.author === props.userName ? "You" : "Other"}
                            key={index}
                        >
                            {val.reply === -1 ? (
                                <div className="messageIndividual">
                                    <div className="name">{val.author}</div>
                                    <div className="msg">{val.message}</div>
                                </div>) : (<div className="messageReply">
                                    <div className="Question">
                                        <div className="name">{props.messageList[val.reply].author}</div>
                                        <div className="msg">{props.messageList[val.reply].message}</div>
                                    </div>
                                    <div className="Answer">
                                        <div className="name">{val.author}</div>
                                        <div className="msg">{val.message}</div>
                                    </div>
                                </div>)
                            }
                            <Reply id={index} handleClickReply={handleClickReply} replyMessageIndex={replyMessageIndex}></Reply>
                        </div>
                    );
                })}
            </div>

            <div className="messageInputs">
                <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>)
}

export default Chat;