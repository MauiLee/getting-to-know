"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "../styles/GatekeeperIntro.module.css";

export default function GatekeeperIntro({ onStart }: { onStart: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Are you ready to get to know me?</h1>
      <div className={styles.buttons}>
        <button onClick={onStart} className={styles.yes}>Yes</button>
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
