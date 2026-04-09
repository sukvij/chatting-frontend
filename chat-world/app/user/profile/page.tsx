"use client";

import { useRouter } from "next/navigation";
import styles from "./profile.module.css";

const user = {
  id: 1,
  name: "Vijendra",
  email: "vijendra@example.com",
  bio: "Love chatting with new people 🚀",
  avatar: "https://i.pravatar.cc/150?img=3",
  status: "Online",
  lastSeen: "2 mins ago",
};

const friends = [
  {
    id: 1,
    name: "Rahul",
    lastMessage: "See you soon bro!",
  },
  {
    id: 2,
    name: "Priya",
    lastMessage: "Let's catch up 😊",
  },
  {
    id: 3,
    name: "Aman",
    lastMessage: "Where are you?",
  },
];

export default function Profile() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Profile Card */}
      <div className={styles.card}>
        <img src={user.avatar} className={styles.avatar} />

        <h2>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.bio}>{user.bio}</p>

        <div className={styles.actions}>
          <button onClick={() => router.push("/user/chats")}>
            💬 Friends Chat
          </button>

          <button className={styles.primary} onClick={()=>router.push("/chat")}>
            🎭 Start Random Chat
          </button>

          <button className={styles.primary} onClick={()=>router.push("/discover")}>
            Discover People
          </button>
        </div>
      </div>

      {/* Friends Preview */}
      <div className={styles.friendsSection}>
        <h3>Your Friends</h3>

        {friends.map((f) => (
          <div key={f.id} className={styles.friendCard}>
            <div>
              <h4>{f.name}</h4>
              <p>{f.lastMessage}</p>
            </div>

            <button onClick={() => router.push("/chat")}>
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}