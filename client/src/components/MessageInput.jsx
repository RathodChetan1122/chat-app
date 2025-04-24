export default function MessageInput() {
    return (
      <div className="p-3 border-top d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
        />
        <button className="btn btn-primary">Send</button>
      </div>
    );
  }
  