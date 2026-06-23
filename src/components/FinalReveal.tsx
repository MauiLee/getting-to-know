// src/components/FinalReveal.tsx
"use client";
import { decodeResults } from "../utils/encodeResults";
import Confetti from "react-confetti";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "../styles/FinalReveal.module.css";

const QUESTIONS = [
  ["Late night drives", "Cozy cafe dates"],
  ["Over-thinker", "Go with the flow"],
  ["Movies", "Books"],
  ["Adventure", "Chill"],
  ["Texting", "Calling"],
];

interface AnswerSet {
  answers: string[];
}

function VibeCard({
  answers,
  label,
  showCopy = false,
  link = "",
}: {
  answers: string[];
  label: string;
  showCopy?: boolean;
  link?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${window.location.pathname}?results=${link}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.vibeCard}>
      <div className={styles.vibeCardHeader}>
        <h2 className={styles.vibeCardLabel}>{label}</h2>
      </div>
      <div className={styles.vibeCardContent}>
        {answers.map((answer, idx) => (
          <div key={idx} className={styles.vibeAnswerRow}>
            <span className={styles.vibeQuestionNum}>Q{idx + 1}</span>
            <span className={styles.vibeAnswer}>{answer}</span>
          </div>
        ))}
      </div>

      {showCopy && (
        <button
          onClick={handleCopyLink}
          className={styles.copyButton}
          title="Copy shareable link"
        >
          {copied ? "✓ Copied!" : "📋 Copy Link"}
        </button>
      )}
    </div>
  );
}

function MatchResult({
  myAnswers,
  theirAnswers,
}: {
  myAnswers: string[];
  theirAnswers: string[];
}) {
  let matchCount = 0;
  myAnswers.forEach((answer, idx) => {
    if (answer === theirAnswers[idx]) matchCount++;
  });
  const compatibility = Math.round((matchCount / myAnswers.length) * 100);

  return (
    <div className={styles.matchResult}>
      <h2 className={styles.matchTitle}>✨ Compatibility Match ✨</h2>
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
        <VibeCard answers={myAnswers} label="Your Vibe" />
        <VibeCard answers={theirAnswers} label="Their Vibe" />
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
          You matched on {matchCount} out of {myAnswers.length} questions!
        </p>
      </div>
    </div>
  );
}

export default function FinalReveal({ results }: { results: string }) {
  const params = useSearchParams();
  const partnerResults = params.get("results");
  const myAnswers = decodeResults(results);
  const theirAnswers = partnerResults ? decodeResults(partnerResults) : null;

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${baseUrl}${typeof window !== "undefined" ? window.location.pathname : ""}?results=${results}`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!theirAnswers ? (
          // Solo mode - show vibe card with share link
          <>
            <div className={styles.headerBox}>
              <h1 className={styles.title}>Your Vibe Card ✨</h1>
              <p className={styles.subtitle}>Share with your partner!</p>
            </div>

            <VibeCard
              answers={myAnswers}
              label="Your Vibe Awaits"
              showCopy={true}
              link={results}
            />

            <div className={styles.shareSection}>
              <h3 className={styles.shareTitle}>Send to Partner</h3>
              <div className={styles.linkBox}>
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className={styles.linkInput}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert("Link copied to clipboard!");
                  }}
                  className={styles.buttonPrimary}
                >
                  Copy Full Link
                </button>
              </div>
              <p className={styles.shareInstructions}>
                or share this code:
                <br />
                <code className={styles.shareCode}>{results}</code>
              </p>
            </div>
          </>
        ) : (
          // Match mode - show both cards and compatibility
          <>
            <Confetti />
            <MatchResult myAnswers={myAnswers} theirAnswers={theirAnswers} />

            <div className={styles.actionButtons}>
              <button
                onClick={() => window.location.reload()}
                className={styles.buttonPrimary}
              >
                Try Again
              </button>
              <a href="/" className={styles.buttonSecondary}>
                Back Home
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
