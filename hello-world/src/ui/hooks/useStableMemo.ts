import { useEffect, useRef } from "react";

function useStableMemo<T>(callback: () => T, dependencies: ReadonlyArray<any>): T | null {
    const valueRef = useRef<T | null>(null);
    useEffect(() => {
        valueRef.current = callback?.();
        return () => {
            if(valueRef.current) {
                valueRef.current = null;
            }
        };
    }, dependencies);
    return valueRef.current;
}

export default useStableMemo;
