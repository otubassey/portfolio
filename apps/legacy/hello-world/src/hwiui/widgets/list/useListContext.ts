import { createContext, useContext } from "react";
import Immutable from "immutable";

import { ListStylePosition, ListStyleType } from "./list";
import { ValuesOf } from "../common";

type DefaultValueAttributes = {
    listStylePosition: ValuesOf<typeof ListStylePosition>;
    listStyleType: ValuesOf<typeof ListStyleType>;
};

const DEFAULT_VALUE = Immutable.Map<keyof DefaultValueAttributes, DefaultValueAttributes[keyof DefaultValueAttributes]>({
    listStylePosition: "outside",
    listStyleType: "none"
});

export const ListComponentContext = createContext<Immutable.Map<keyof DefaultValueAttributes, DefaultValueAttributes[keyof DefaultValueAttributes]>>(DEFAULT_VALUE);

function useListContext(): Immutable.Map<keyof DefaultValueAttributes, DefaultValueAttributes[keyof DefaultValueAttributes]> {
    return useContext<Immutable.Map<keyof DefaultValueAttributes, DefaultValueAttributes[keyof DefaultValueAttributes]>>(ListComponentContext);
}

export default useListContext;
