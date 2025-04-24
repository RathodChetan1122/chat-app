export default function Sidebar({ users, activeUser, setActiveUser, currentUser }) {
    return (
      <div className="p-3">
        <h5>Chats</h5>
        <ul className="list-group">
          {users
            .filter((user) => user !== currentUser) // Don’t list yourself
            .map((user) => (
              <li
                key={user}
                className={`list-group-item ${
                  user === activeUser ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveUser(user)}
              >
                {user}
              </li>
            ))}
        </ul>
      </div>
    );
  }
  