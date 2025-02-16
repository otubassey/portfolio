import { createContext } from "react";
import { PlaygroundAttributesRecord } from "@/packages/playground";

export type ChoiceGroupContextValue = {
    name: string | undefined;
    onNodeChange: (previous: PlaygroundAttributesRecord, current: PlaygroundAttributesRecord) => void;
    value: unknown;
};

const ChoiceGroupContext = createContext<ChoiceGroupContextValue | undefined>(undefined);

export default ChoiceGroupContext;
