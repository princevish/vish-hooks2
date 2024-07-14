import { useEffect, useRef } from "react";
/**
 * Custom hook that detects clicks outside of a specified element.
 * 
 * @param callback - A function to be called when a click outside of the element is detected.
 * @returns A ref object that should be attached to the element to be monitored for clicks outside.
 */
export function useClickOutside(callback: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    const click = ({ target }: Event): void => {
    if (target && ref.current && (ref.current as HTMLElement).contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", click);

    return () => {
      document.removeEventListener("mousedown", click);
    };
  }, [callback]);

  return ref;
}
