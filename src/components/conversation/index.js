import { useEffect, useRef, useState } from "react";
import Message from "../message";
import "./index.css";

const Conversation = ({ contact, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      onSendMessage(contact?.userId, newMessage);
      setNewMessage("");
    }
  };

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom on initial load and whenever new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [contact?.chat]);

  return (
    <div className="conversation">
      <div className="conversation-header">
        <img src={contact?.profilePictureURL} alt={contact?.name} />
        <div>
          <h4>{contact?.name}</h4>
          <p>Click here for contact info</p>
        </div>
      </div>
      <div className="conversation-messages">
        {contact?.chat?.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="conversation-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="conversation-send" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Conversation;
