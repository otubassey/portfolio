import { v4 as uuidV4, parse, stringify } from "uuid";

import useStableMemo from "./useStableMemo";

function useGeneratedId(): string | null {
    return useStableMemo<string>(() => stringify(parse(uuidV4())), []);
}

export default useGeneratedId;
