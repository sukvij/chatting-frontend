"use client";

import { useEffect, useState } from "react";
import styles from "./chat.module.css";

export default function ChatPage() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: "me" | "other" }[]
  >([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      setMessages((prev) => [
        ...prev,
        { text: event.data, sender: "other" },
      ]);
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && msg.trim()) {
      ws.send(msg); // emojis work automatically (UTF-8)
      setMessages((prev) => [
        ...prev,
        { text: msg, sender: "me" },
      ]);
      setMsg("");
    }
  };

  // ✅ Send on Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>💬 Random Chat</h2>

      <div className={styles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              m.sender === "me" ? styles.me : styles.other
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}   // 👈 ENTER support
          placeholder="Type message... 😊"
        />
        <button className={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}