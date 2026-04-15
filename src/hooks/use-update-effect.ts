import { useEffect, useRef } from "react";
import type { DependencyList, EffectCallback } from "react";

export const useUpdateEffect = (
  effect: EffectCallback,
  deps: DependencyList,
) => {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    return effect();
  }, deps);
};
