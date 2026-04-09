"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>ChatWorld</h2>
        <div>
          <button onClick={() => router.push("/auth/login")} className={styles.navBtn}>
            Login
          </button>
          <button onClick={() => router.push("/auth/signup")} className={styles.navBtn}>
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>Talk to Strangers Instantly</h1>
        <p>No signup required. Start chatting in seconds.</p>

        <button
          className={styles.primaryBtn}
          onClick={() => router.push("/chat")}
        >
          Start Chatting
        </button>
      </div>

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.card}>
          <h3>⚡ Instant Match</h3>
          <p>Connect with random people in real-time.</p>
        </div>

        <div className={styles.card}>
          <h3>🔒 Secure</h3>
          <p>End-to-end encrypted chats.</p>
        </div>

        <div className={styles.card}>
          <h3>🎭 Anonymous</h3>
          <p>No personal info required.</p>
        </div>
      </div>
    </div>
  );
}