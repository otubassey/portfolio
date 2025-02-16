import { ReactNode } from "react";

import { ImmutablePlaygroundAttributes } from "../../common";

export type OnNodeChange = (val: ImmutablePlaygroundAttributes) => void;

export type Props = {
    children?: ReactNode;
    node: ImmutablePlaygroundAttributes | null;
    onNodeChange: OnNodeChange;
};
