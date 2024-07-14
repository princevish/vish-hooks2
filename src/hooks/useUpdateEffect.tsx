import { EffectCallback, DependencyList, useRef, useEffect } from "react";
/**
 * Custom hook that runs an effect only on subsequent renders, skipping the initial render.
 * 
 * @param {EffectCallback} effect - The effect function to run.
 * @param {DependencyList} [deps] - Optional dependencies array to specify when the effect should re-run.
 * 
 * @example
 * function ExampleComponent() {
 *   useUpdateEffect(() => {
 *     console.log("Effect ran on subsequent renders");
 *   }, [someDependency]);
 * 
 *   return <div>Example Component</div>;
 * }
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log("isFirstRender ", isFirstRender.current);
    if (!isFirstRender.current) {
      console.log("not skipped");
      return effect();
    } else {
      isFirstRender.current = false;
    }
  }, deps);
}
