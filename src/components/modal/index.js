import { useRef, useEffect, useState } from "react";
import "./index.css";

const Modal = ({ show, onClose, markAsUnread, deleteConversation }) => {
  const modalRef = useRef();
  const [isUnread, setIsUnread] = useState(true);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close modal if clicked outside
    }
  };

  const handleMarkAsUnread = () => {
    setIsUnread(!isUnread);
    markAsUnread();
    onClose();
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal">
        <p className="modal-btn" onClick={handleMarkAsUnread}>
          {isUnread ? "Mark as Unread" : "Mark as Read"}
        </p>
        <p className="modal-btn" onClick={deleteConversation}>
          Delete
        </p>
        <p className="modal-btn" onClick={onClose}>
          Cancel
        </p>
      </div>
    </div>
  );
};

export default Modal;
