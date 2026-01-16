import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Editor from "./Editor";

export default function EditorPage() {
  const { id: roomId } = useParams();
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    s.emit("join-room", roomId);

    //  Receive chat history in the session
    s.on("receive-chat-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => s.disconnect();
  }, [roomId]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      // Send chat message to all users in the room
      socket.emit("send-chat-message", {
        text,
        sender: `User ${socket.id.substring(0, 4)}`,
      });
      setText("");
    }
  };

  return (
    <div className="editor-page-container">
      <div className="main-editor-area">
        <div className="quill-wrapper">
          <Editor socket={socket} roomId={roomId} />
        </div>
      </div>

      <div className="chat-sidebar">
        <div className="chat-header">
          <h3>Room: {roomId.substring(0, 8)}...</h3>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className="message">
              <div className="message-sender">{m.sender}</div>
              <div className="message-text">{m.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendChat} className="chat-input-form">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
