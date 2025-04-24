export default function ChatWindow({ messages, currentUser }) {
    return (
      <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2 bg-body-tertiary">
        {messages.map((msg, index) => {
          const isOwn = msg.sender === currentUser;
          const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div
              key={index}
              className={`d-flex ${isOwn ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className={`p-2 rounded-3 ${isOwn ? "bg-primary text-white" : "bg-light text-dark"}`}
                style={{ maxWidth: "75%" }}
              >
                <div className="fw-bold small mb-1">{msg.sender}</div>
                <div>{msg.content}</div>
                <div className="text-end small text-muted mt-1">{time}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  