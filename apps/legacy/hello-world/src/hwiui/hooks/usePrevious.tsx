import { useEffect, useRef } from "react";

function usePrevious<T>(value: any): T | null {
    const ref = useRef(null);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default usePrevious;
