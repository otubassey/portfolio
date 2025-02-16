import { ComponentType } from "react";

import { ValuesOf } from "@/packages/hwiutils";
import { PlaygroundAttributesRecord } from "@/packages/playground";
import { PresentationTitle } from "./presentation";

export type PresentationAttributes = {
    node?: PlaygroundAttributesRecord | null;
    presenter: ComponentType<any>;
    component?: ComponentType<any> | null;
    title: string;
};

export type ComponentsByPresentationTitleAttributes = {
    [key in Exclude<PresentationTitleValues, "Overview">]: ComponentType<any> | null | undefined
};

export type PresentationTitleValues = ValuesOf<typeof PresentationTitle>;
