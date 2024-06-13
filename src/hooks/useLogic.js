import { useState } from "react";
import { data } from "../mockData";

const useLogic = () => {
  const processedData = data?.map((contact, index) => {
    // Set unreadCount to 0 for the first contact
    if (index === 0) {
      return { ...contact, unreadCount: 0 };
    }
    return contact;
  });
  const [contacts, setContacts] = useState(processedData);
  // const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(data[0]?.userId);
  const [modalContactId, setModalContactId] = useState(null);

  const selectContact = (userId) => {
    setSelectedContactId(userId);
    setContacts(
      contacts.map((contact) =>
        contact.userId === userId ? { ...contact, unreadCount: 0 } : contact
      )
    );
  };

  const openModal = (userId) => {
    setModalContactId(userId);
  };

  const closeModal = () => {
    setModalContactId(null);
  };

  const markAsUnread = () => {
    setContacts(
      contacts.map((contact) =>
        contact.userId === modalContactId
          ? // { ...contact, unreadCount: 1 }
            { ...contact, unreadCount: contact.unreadCount === 0 ? 1 : 0 }
          : contact
      )
    );
    closeModal();
  };

  const deleteConversation = () => {
    setContacts(contacts.filter((contact) => contact.userId !== modalContactId));
    closeModal();
  };

  const sendMessage = (userId, message) => {
    const formattedTime = getCurrentTime();
    setContacts(
      contacts.map((contact) =>
        contact?.userId === userId
          ? {
              ...contact,
              chat: [
                ...contact?.chat,
                {
                  you: { message, timeStamp: formattedTime },
                },
              ],
            }
          : contact
      )
    );
  };

  const selectedContact = contacts?.find((contact) => contact?.userId === selectedContactId);

  // Function to format a number to always have two digits
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  // Function to get current time in hh:mm format 24-hour format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = formatNumber(now.getHours());
    const minutes = formatNumber(now.getMinutes());
    return `${hours}:${minutes}`;
  };

  return {
    contacts,
    selectedContactId,
    modalContactId,
    selectContact,
    openModal,
    closeModal,
    markAsUnread,
    deleteConversation,
    selectedContact,
    sendMessage,
  };
};

export default useLogic;
