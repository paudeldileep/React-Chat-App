import React, { useEffect, useState,useRef } from "react";
import { db } from "../config/firebase";
import firebase from 'firebase';
import MessageItem from "./MessageItem";

const MessageBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");

  const query = db.collection("messages").orderBy("createdAt").limit(100);
  const messagesRef=db.collection("messages");

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  useEffect(() => {
    
    
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setMessages(data);
    });

    //callback
    return unsubscribe;
  },[]);

  const handleInputChange = (e) => {
    setInputMsg(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();

    const {uid,displayName,photoURL}=user;
    const trimmedMessage = inputMsg.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        content: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        uname:displayName,
        photoURL,
      });
      // Clear input field
      setInputMsg("");
    }
  };

  return (
    <div className="p-2 h-full border border-gray-400 bg-gray-200 w-full rounded-md shadow-md flex flex-col mb-4">
      <div className="w-full my-1 overflow-y-scroll overflow-hidden no-scrollbar mb-2">
      {messages &&
        messages.map((msg) => <MessageItem key={msg.uid} message={msg} user={user} />)}
        <span ref={dummy}></span>
      </div>
      <form onSubmit={handleInputSubmit} className="justify-self-end">
        <input
          type="text"
          value={inputMsg}
          onChange={handleInputChange}
          placeholder="Start typing your message..."
          className="outline-none border-b border-blue-400 focus:outline-none w-5/6"
        />
        <button className="border border-blue-400 rounded-md px-2 ml-2 w-20" type="submit" disabled={!inputMsg}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageBox;
