"use client";
import { useState } from "react";
import GatekeeperIntro from "../components/GatekeeperIntro";
import QuizContainer from "../components/QuizContainer";
import FinalReveal from "../components/FinalReveal";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState<string | null>(null);

  if (!started) return <GatekeeperIntro onStart={() => setStarted(true)} />;
  if (finished) return <FinalReveal results={finished} />;
  return <QuizContainer onFinish={(results) => setFinished(results)} />;
}
