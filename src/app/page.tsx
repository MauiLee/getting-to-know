"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GatekeeperIntro from "../components/GatekeeperIntro";
import QuizContainer from "../components/QuizContainer";
import FinalReveal from "../components/FinalReveal";

function HomeContent() {
  const params = useSearchParams();
  const creatorResults = params.get("results");
  const [started, setStarted] = useState(false);
  const [name, setName] = useState("");
  const [finished, setFinished] = useState<string | null>(null);

  if (!started) return <GatekeeperIntro onStart={(userName) => { setName(userName); setStarted(true); }} />;
  if (finished) return <FinalReveal results={finished} creatorResults={creatorResults} />;
  return <QuizContainer name={name} creatorResults={creatorResults} onFinish={(results) => setFinished(results)} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#000", color: "#FFFF00", fontSize: "1.5rem", fontWeight: "bold" }}>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
