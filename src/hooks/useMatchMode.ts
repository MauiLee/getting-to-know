// src/hooks/useMatchMode.ts
import { useSearchParams } from "next/navigation";

export default function useMatchMode() {
  const params = useSearchParams();
  return params.get("results") !== null;
}
