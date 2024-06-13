import ContactItem from "../contactItem";
import "./index.css";

const ContactList = ({ contacts, selectContact, openModal }) => {
  return (
    <div className="contact-list">
      <p className="contact-chat">Chat</p>
      {contacts?.map((contact) => (
        <ContactItem
          key={contact?.userId}
          contact={contact}
          selectContact={selectContact}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default ContactList;
