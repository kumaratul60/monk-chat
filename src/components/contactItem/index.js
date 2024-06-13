import "./index.css";

const ContactItem = ({ contact, selectContact, openModal }) => {
  const lastMessages = getLastMessages(contact?.chat || []);
  return (
    <div className="contact-item" onClick={() => selectContact(contact?.userId)}>
      <img src={contact?.profilePictureURL} alt={contact?.name} />
      <div className="contact-info">
        <h4>{contact?.name}</h4>
        {Object.entries(lastMessages)?.map(([userId, message], index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div className="contact-actions">
        {contact?.unreadCount > 0 && <span className="unread-count">{contact?.unreadCount}</span>}
        <button
          className="popover-btn"
          onClick={(e) => {
            e.stopPropagation();
            openModal(contact?.userId);
          }}
        >
          •••
        </button>
      </div>
    </div>
  );
};

// Function to get the last message from each user
const getLastMessages = (chat) => {
  const lastMessages = {};
  chat?.forEach((conversation) => {
    for (const key in conversation) {
      if (key !== "you") {
        lastMessages[key] = conversation[key]?.message;
      }
    }
  });
  return lastMessages;
};


export default ContactItem;
