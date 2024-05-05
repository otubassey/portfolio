import { v1 as uuidv1 } from "uuid";

import useStableMemo from "./useStableMemo";

function useGeneratedId(): string | null {
    return useStableMemo<string>(() => uuidv1(), []);
}

export default useGeneratedId;
