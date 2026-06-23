// src/utils/encodeResults.ts
export default function encodeResults(answers: string[]): string {
  return btoa(JSON.stringify(answers));
}

export function decodeResults(encoded: string): string[] {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return [];
  }
}
