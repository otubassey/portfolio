import useStableMemo from "./useStableMemo";
import generateId from "@/hwiutils/generateId/generateId";

function useGeneratedId(): string | null {
    return useStableMemo<string>(generateId, []);
}

export default useGeneratedId;
