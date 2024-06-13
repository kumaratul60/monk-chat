import "./App.css";
import ContactList from "./components/contactList";
import Conversation from "./components/conversation";
import Modal from "./components/modal";
import useLogic from "./hooks/useLogic"

const App = () => {
  const {
    contacts,
    modalContactId,
    selectContact,
    openModal,
    closeModal,
    markAsUnread,
    deleteConversation,
    selectedContact,
    sendMessage,
  } = useLogic();

  return (
    <div className="app">
      <ContactList contacts={contacts} selectContact={selectContact} openModal={openModal} />
      {selectedContact && <Conversation contact={selectedContact} onSendMessage={sendMessage} />}
      <Modal
        show={modalContactId !== null}
        onClose={closeModal}
        markAsUnread={markAsUnread}
        deleteConversation={deleteConversation}
      />
    </div>
  );
};

export default App;
