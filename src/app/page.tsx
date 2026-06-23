"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import GatekeeperIntro from "../components/GatekeeperIntro";
import QuizContainer from "../components/QuizContainer";
import FinalReveal from "../components/FinalReveal";

export default function Home() {
  const params = useSearchParams();
  const creatorResults = params.get("results");
  const [started, setStarted] = useState(false);
  const [name, setName] = useState("");
  const [finished, setFinished] = useState<string | null>(null);

  if (!started) return <GatekeeperIntro onStart={(userName) => { setName(userName); setStarted(true); }} />;
  if (finished) return <FinalReveal results={finished} creatorResults={creatorResults} />;
  return <QuizContainer name={name} creatorResults={creatorResults} onFinish={(results) => setFinished(results)} />;
}
