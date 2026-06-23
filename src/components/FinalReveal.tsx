// src/components/FinalReveal.tsx
"use client";
import { decodeResults } from "../utils/encodeResults";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import styles from "../styles/FinalReveal.module.css";
import { QuizData } from "../utils/encodeResults";

function VibeCard({
  answers,
  label,
  name = "",
}: {
  answers: string[];
  label: string;
  name?: string;
}) {
  return (
    <div className={styles.vibeCard}>
      <div className={styles.vibeCardHeader}>
        <h2 className={styles.vibeCardLabel}>{label}</h2>
        {name && <p style={{ fontSize: "14px", color: "#666", margin: "5px 0 0 0" }}>~ {name}</p>}
      </div>
      <div className={styles.vibeCardContent}>
        {answers.map((answer, idx) => (
          <div key={idx} className={styles.vibeAnswerRow}>
            <span className={styles.vibeQuestionNum}>Q{idx + 1}</span>
            <span className={styles.vibeAnswer}>{answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchResult({
  myData,
  theirData,
}: {
  myData: QuizData;
  theirData: QuizData;
}) {
  let matchCount = 0;
  myData.answers.forEach((answer, idx) => {
    if (answer === theirData.answers[idx]) matchCount++;
  });
  const compatibility = Math.round((matchCount / myData.answers.length) * 100);

  return (
    <div className={styles.matchResult}>
      <h2 className={styles.matchTitle}>✨ {myData.name} & {theirData.name} ✨</h2>
      <h3 style={{ textAlign: "center", fontSize: "16px", marginBottom: "20px" }}>Compatibility Match</h3>
      <div className={styles.compatibilityScore}>
        <span className={styles.scoreValue}>{compatibility}%</span>
        <div className={styles.compatibilityBar}>
          <div
            className={styles.compatibilityFill}
            style={{ width: `${compatibility}%` }}
          />
        </div>
      </div>

      <div className={styles.matchGrid}>
        <VibeCard answers={myData.answers} label="Your Vibe" name={myData.name} />
        <VibeCard answers={theirData.answers} label="Their Vibe" name={theirData.name} />
      </div>

      <div className={styles.matchDetails}>
        <h3 className={styles.matchDetailsTitle}>
          {compatibility >= 80
            ? "🔥 Amazing Match!"
            : compatibility >= 60
              ? "💕 Great Vibes!"
              : "💫 You're Interesting!"}
        </h3>
        <p className={styles.matchMessage}>
          You matched on {matchCount} out of {myData.answers.length} questions!
        </p>
      </div>
    </div>
  );
}

export default function FinalReveal({ results, creatorResults }: { results: string; creatorResults?: string | null }) {
  const [mounted, setMounted] = useState(false);
  const [partnerResults, setPartnerResults] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setPartnerResults(creatorResults || null);
  }, [creatorResults]);

  if (!mounted) {
    return null;
  }

  const myData = decodeResults(results);
  const theirData = partnerResults ? decodeResults(partnerResults) : null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const shareUrl = `${baseUrl}${pathname}?results=${results}`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!theirData ? (
          // Solo mode - show vibe card with share link
          <>
            <div className={styles.headerBox}>
              <h1 className={styles.title}>Your Vibe Card ✨</h1>
              <p className={styles.subtitle}>Share with your partner!</p>
            </div>

            <VibeCard
              answers={myData.answers}
              label="Your Vibe Awaits"
              name={myData.name}
              showCopy={true}
              link={results}
            />
// Parse results - format is "encoded1|encoded2" if both people answered
  const parts = results.includes("|") ? results.split("|") : [results];
  const myData = decodeResults(parts[0]);
  const theirData = parts[1] ? decodeResults(parts[1]) : partnerResults ? decodeResults(partnerResults) : null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {theirData ? (
          <>
            <Confetti />
            <MatchResult myData={myData} theirData={theirData} />
            <div className={styles.actionButtons}>
              <button
                onClick={() => window.location.href = "/"}
                className={styles.buttonPrimary}
              >
                Start Over
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.headerBox}>
              <h1 className={styles.title}>Your Vibe Card ✨</h1>
              <p className={styles.subtitle}>{myData.name}</p>
            </div>
            <VibeCard
              answers={myData.answers}
              label="Your Vibes"
              name={myData.name}
            /