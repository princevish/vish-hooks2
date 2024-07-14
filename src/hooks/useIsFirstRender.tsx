import { useRef } from "react";
/**
 * Custom hook that returns a boolean value indicating whether the component is being rendered for the first time.
 *
 * @returns {boolean} True if it is the first render, false otherwise.
 */
export function useIsFirstRender(): boolean {
  const monitor = useRef<boolean>(true);
  if (monitor.current) {
    monitor.current = false;
    return true;
  }
  return false;
}
