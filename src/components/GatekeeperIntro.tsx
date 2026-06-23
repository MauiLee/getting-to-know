"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "../styles/GatekeeperIntro.module.css";

export default function GatekeeperIntro({ onStart }: { onStart: (name: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const [name, setName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  const handleStart = () => {
    if (name.trim()) {
      onStart(name);
    } else {
      alert("Please enter your name!");
    }
  };

  if (!showNameInput) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Are you ready to get to know me?</h1>
        <div className={styles.buttons}>
          <button onClick={() => setShowNameInput(true)} className={styles.yes}>Yes</button>
          <motion.button
            onMouseEnter={() => setHovered(true)}
            animate={hovered ? { x: 100 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={styles.no}
          >
            No
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>What's your name? 😊</h1>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        marginTop: "40px",
      }}>
        <input
          type="text"
          placeholder="Enter your name"
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
