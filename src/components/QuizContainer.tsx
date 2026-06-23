"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import encodeResults from "../utils/encodeResults";
import styles from "../styles/QuizContainer.module.css";

const questions = [
  ["Late night drives", "Cozy cafe dates"],
  ["Over-thinker", "Go with the flow"],
  ["Movies", "Books"],
  ["Adventure", "Chill"],
  ["Texting", "Calling"],
  ["Planning everything", "Spontaneous"],
  ["Introvert", "Extrovert"],
  ["Coffee", "Tea"],
  ["Morning person", "Night owl"],
  ["City vibes", "Nature vibes"],
];

export default function QuizContainer({ name, creatorResults, onFinish }: { name: string; creatorResults?: string | null; onFinish: (results: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (choice: string) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const encoded = encodeResults(name, newAnswers);
      // Pass both results if creator results exist
      if (creatorResults) {
        onFinish(`${encoded}|${creatorResults}`);
      } else {
        onFinish(encoded);
      }
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={styles.options}
      >
        {questions[step].map((option) => (
          <button key={option} onClick={() => handleAnswer(option)} className={styles.option}>
            {option}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
