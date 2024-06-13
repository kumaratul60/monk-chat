import "./index.css";

const Message = ({ message }) => {
  return (
    <div className="message-container">
      {Object.keys(message)?.map((key, index) => {
        const msg = message[key];
        const isYou = key === "you";
        const messageClass = isYou ? "message-right" : "message-left";

        return (
          <div key={index} className={`message ${messageClass}`}>
            <div>{msg?.message}</div>
            <div className="timestamp">{msg?.timeStamp}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
