import { Ref, useCallback, useRef, useState } from "react";

/**
 * Custom hook that provides a ref and a boolean value indicating whether the element is currently focused.
 *
 * @returns A tuple containing the ref and the useFocusRef boolean value.
 */
export function useFocusRef<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [isFocused, setFocused] = useState(false);
  const ref = useRef<T>();
  const focus = () => {
    setFocused(true);
  };

  const blur = () => {
    setFocused(false);
  };

  const callback = useCallback((node: T) => {
    if (ref.current) {
      ref.current.removeEventListener("focus", focus);
      ref.current.removeEventListener("blur", blur);
    }
    ref.current = node;
    if (node) {
      ref.current.addEventListener("focus", focus);
      ref.current.addEventListener("blur", blur);
    }
  }, []);
  return [callback, isFocused];
}
