import { MutableRefObject, useCallback, useRef } from "react";

function useRefs<T>(
  initialValue?: Array<T> | {[key: string | number | symbol]: T} | null
): [MutableRefObject<Array<T> | {[key: string | number | symbol]: T}>, (key: string | number | symbol) => (value: T) => void] {
  const defaultValue = !initialValue ? [] : initialValue;
  const refs = useRef<Array<T> | {[key: string | number | symbol]: T}>(defaultValue);
  const setRefs = useCallback((key: string | number | symbol) => (value: T) => {
    if(refs?.current) {
      if(Array.isArray(refs.current) && typeof key === "number") {
        refs.current[key] = value;
      } else {
        refs.current = {...refs.current, [key]: value};
      }
    }
  }, [refs]);
  return [refs, setRefs];
}

export default useRefs;
