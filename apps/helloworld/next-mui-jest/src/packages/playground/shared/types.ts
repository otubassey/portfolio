import { ComponentType } from "react";

import { PlaygroundAttributesRecord } from "./playgroundAttributes";

type ComponentProps = {
    [key: string]: unknown;
};

export type OnPropsGenerator = (node: PresentationProps["node"], mapping: PresentationProps["componentMapping"]) => ComponentProps;

export type PresentationProps = {
    componentMapping: {[key: string]: ComponentType<unknown> | null | undefined};
    node: PlaygroundAttributesRecord
};
