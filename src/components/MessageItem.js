import React from "react";

const MessageItem = ({ message,user }) => {
    
  const { content, uid, photoURL,uname } = message;

  
  const messageClass = uid === user.uid ? "flex-row-reverse" : "flex-row";
  return (
    <>
      <div className={`message flex ${messageClass} py-1`}>
        <img src={photoURL} alt={uname} className="rounded-full h-6 w-6 m-1" />
        <p className="m-1 px-1 font-mono">{content}</p>
      </div>
    </>
  );
};

export default MessageItem;
