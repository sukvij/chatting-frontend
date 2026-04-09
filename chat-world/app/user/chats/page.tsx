"use client";

import { useState } from "react";
import styles from "./chats.module.css";

const users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Aman" },
];

const dummyChats: any = {
  1: [
    { fromMe: false, text: "Hi bro 👋" },
    { fromMe: true, text: "Hey!" },
  ],
  2: [
    { fromMe: false, text: "Hello 😊" },
    { fromMe: true, text: "Hi Priya!" },
  ],
  3: [
    { fromMe: false, text: "What's up?" },
  ],
};

export default function Chats() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(dummyChats[selectedUser.id]);
  const [input, setInput] = useState("");

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setMessages(dummyChats[user.id] || []);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { fromMe: true, text: input };

    setMessages((prev: any) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>💬 Chats</h2>

        {users.map((user) => (
          <div
            key={user.id}
            className={`${styles.user} ${
              selectedUser.id === user.id ? styles.active : ""
            }`}
            onClick={() => handleUserClick(user)}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        {/* Header */}
        <div className={styles.header}>
          <h3>{selectedUser.name}</h3>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg: any, index: number) => (
            <div
              key={index}
              className={
                msg.fromMe ? styles.myMessage : styles.theirMessage
              }
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}