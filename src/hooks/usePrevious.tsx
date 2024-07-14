import { useRef } from "react";
/**
 * Custom hook that returns the previous value of a given value.
 *
 * @template T - The type of the value.
 * @param {T} value - The current value.
 * @returns {T | undefined} - The previous value.
 */
export function usePrevious<T>(value: T): T | undefined {
  const previews = useRef<T>();
  const prevuesData = previews.current;
  previews.current = value;
  return prevuesData;
}
