// === Enhanced ChatApp Layout ===

import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

const socket = io("http://localhost:5000");

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    socket.on("chat_history", (msgs) => setMessages(msgs));
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));

    return () => {
      socket.off("chat_history");
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && currentUser && activeUser) {
      const message = {
        sender: currentUser,
        receiver: activeUser,
        content: newMessage,
        timestamp: new Date().toISOString()
      };
      socket.emit("send_message", message);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === currentUser && msg.receiver === activeUser) ||
      (msg.sender === activeUser && msg.receiver === currentUser)
  );

  if (!currentUser) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <div className="text-center">
          <h4>Select User to Login</h4>
          <button className="btn btn-primary m-2" onClick={() => setCurrentUser("User 1")}>
            Login as User 1
          </button>
          <button className="btn btn-secondary m-2" onClick={() => setCurrentUser("User 2")}>
            Login as User 2
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-100 d-flex flex-column">
      <div className="bg-dark text-white text-center py-2">
        <h5>Logged in as <span className="text-info">{currentUser}</span></h5>
        {activeUser && (
          <p className="m-0">Messaging <strong>{activeUser}</strong></p>
        )}
      </div>
      <div className="row flex-grow-1">
        <div className="col-3 border-end bg-light">
          <Sidebar
            users={["User 1", "User 2"]}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
            currentUser={currentUser}
          />
        </div>
        <div className="col-9 d-flex flex-column h-100">
          {activeUser ? (
            <>
              <ChatWindow messages={filteredMessages} currentUser={currentUser} />
              <div className="p-3 border-top d-flex bg-white">
                <input
                  type="text"
                  className="form-control me-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${activeUser}`}
                />
                <button
                  className="btn btn-primary"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-muted">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}
