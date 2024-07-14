import { useEffect, useRef } from "react";
/**
 * Custom hook that executes a callback function after a specified delay.
 *
 * @param callback - The function to be executed after the delay.
 * @param delay - The delay in milliseconds before executing the callback.
 *
 * @returns - None.
 */
export function useTimeout(callback: () => void, delay: number) {
  const refCk = useRef(callback);
  refCk.current = callback;

  useEffect(() => {
    const timeout = setTimeout(() => refCk.current(), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
}
