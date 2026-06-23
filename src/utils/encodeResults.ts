// src/utils/encodeResults.ts
export interface QuizData {
  name: string;
  answers: string[];
}

export default function encodeResults(name: string, answers: string[]): string {
  return btoa(JSON.stringify({ name, answers }));
}

export function decodeResults(encoded: string): QuizData {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return { name: "Unknown", answers: [] };
  }
}
