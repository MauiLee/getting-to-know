"use client";
import { motion } from "framer-motion";
import styles from "../styles/GatekeeperIntro.module.css";

export default function GatekeeperIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ready to get to know each other? 🎮</h1>
      <p className={styles.subtitle}>Answer a few quick questions...</p>
      <div className={styles.buttons}>
        <button onClick={onStart} className={styles.yes}>
          Start Quiz →
        </button>
      </div>
    </div>
  );
}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleStart()}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "2px solid #333",
            width: "300px",
            maxWidth: "90%",
            textAlign: "center",
          }}
          autoFocus
        />
        <button onClick={handleStart} className={styles.yes}>
          Let's Go!
        </button>
      </div>
    </div>
  );
}
