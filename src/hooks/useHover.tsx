import { Ref, useEffect, useRef, useState } from "react";

/**
 * Custom hook that tracks whether an element is being hovered over.
 *
 * @returns A tuple containing a ref and a boolean value. The ref can be attached to the element that needs to be tracked for hover, and the boolean value indicates whether the element is currently being hovered over.
 */
export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);
  useEffect(() => {
    setIsHovered(false);
    function monitorHover() {
      setIsHovered(true);
    }
    function monitorHoverLeave() {
      setIsHovered(false);
    }

    ref?.current?.addEventListener("mouseenter", monitorHover);
    ref?.current?.addEventListener("mouseleave", monitorHoverLeave);

    return () => {
      ref?.current?.removeEventListener("mouseenter", monitorHover);
      ref?.current?.addEventListener("mouseleave", monitorHoverLeave);
    };
  }, []);
  return [ref, isHovered];
}
