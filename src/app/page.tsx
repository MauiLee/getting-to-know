"use client";
import { useState, useEffect } from "react";
import GatekeeperIntro from "../components/GatekeeperIntro";
import QuizContainer from "../components/QuizContainer";
import FinalReveal from "../components/FinalReveal";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [creatorResults, setCreatorResults] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if there's a creatorResults in URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlResults = params.get("results");
      if (urlResults) {
        setCreatorResults(urlResults);
      }
    }
  }, []);

  if (!mounted) return null;

  // Show intro first
  if (!started) {
    return <GatekeeperIntro onStart={() => setStarted(true)} />;
  }

  // Show quiz after start
  if (!results) {
    return (
      <QuizContainer 
        name="You" 
        onFinish={(encodedResults) => {
          setResults(encodedResults);
        }} 
      />
    );
  }

  // Show final results with match if creator results exist
  if (creatorResults) {
    // Both people answered - show match
    return <FinalReveal results={`${results}|${creatorResults}`} />;
  }

  // Only this person answered - show result + share link
  return <FinalReveal results={results} />;
}
