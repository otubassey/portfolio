import { generateId } from "@/packages/hwiutils";
import useStableMemo from "./useStableMemo";

function useGeneratedId(): string | null {
    return useStableMemo<string>(generateId, []);
}

export default useGeneratedId;
