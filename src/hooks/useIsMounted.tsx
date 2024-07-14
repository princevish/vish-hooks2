import { useEffect, useRef } from "react";

/**
 * Custom hook that returns a function to check if the component is mounted.
 *
 * @returns {() => boolean} A function that returns a boolean value indicating if the component is mounted.
 */
export function useIsMounted(): () => boolean {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return () => isMountedRef.current;
}
