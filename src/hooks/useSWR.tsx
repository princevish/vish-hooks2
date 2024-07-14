import { useEffect, useMemo, useState } from "react";
/**
 * Custom hook for data fetching and state management.
 *
 * @template T - The type of the data returned by the fetcher function.
 * @template E - The type of the error returned by the fetcher function.
 * @param {string} _key - The key used for caching the data.
 * @param {() => T | Promise<T>} fetcher - The function used for fetching the data.
 * @returns {{ data?: T; error?: E; }} - An object containing the fetched data and error, if any.
 */
export function useSWR<T = unknown, E = unknown>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T;
  error?: E;
} {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<E>();
  const fetchData = useMemo(fetcher, [fetcher]);

  useEffect(() => {
    if (fetchData instanceof Promise) {
      fetchData.then(setData, setError);
    }
  }, [fetchData]);

  return { data: fetchData instanceof Promise ? data : fetchData, error };
}
