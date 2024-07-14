import { useCallback, useState } from "react";

const getQuery = () => {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

/**
 * Returns the value of a query string parameter by its key.
 *
 * @param {string} key - The key of the query string parameter.
 * @return {string | null} - The value of the query string parameter, or null if the parameter is not found.
 */
const getQueryStringVal = (key: string): string | null => {
  return getQuery().get(key);
};

export const useQueryParam = (
  key: string,
  defaultVal: string
): [string, (val: string) => void] => {
  const [query, setQuery] = useState(() => {
    const queryVal = getQueryStringVal(key) ?? defaultVal;
    return queryVal;
  });

  const updateUrl = useCallback(
    (newVal: string) => {
      const query = getQuery();
      if (newVal.trim() !== "") {
        query.set(key, newVal);
      } else {
        query.delete(key);
      }

      if (typeof window !== "undefined") {
        const { protocol, host, pathname } = window.location;
        const newUrl =
          `${protocol}//${host}${pathname}` +
          (newVal.trim() !== "" ? `?${query.toString()}` : "");
        window.history.replaceState({}, "", newUrl);
      }

      setQuery(newVal);
    },
    [key]
  );

  return [query, updateUrl];
};
