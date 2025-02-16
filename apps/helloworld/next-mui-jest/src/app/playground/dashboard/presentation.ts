import Overview from "./overview";
import { ToggleButtonPresentation } from "./presentationComponents";
import { ComponentsByPresentationTitleAttributes, PresentationAttributes, PresentationTitleValues } from "./types";

export const PresentationTitle = {
    OVERVIEW: "Overview",
    TOGGLE_BUTTON: "ToggleButton"
} as const;

export const ComponentsByPresentationTitle: ComponentsByPresentationTitleAttributes = {
    [PresentationTitle.TOGGLE_BUTTON]: ToggleButtonPresentation?.component
} as const;

export const PresentationsByTitle: {[key in PresentationTitleValues]: PresentationAttributes} = {
    [PresentationTitle.OVERVIEW]: {
        node: null,
        presenter: Overview,
        component: null,
        title: "Playground Overview"
    },
    [PresentationTitle.TOGGLE_BUTTON]: ToggleButtonPresentation
} as const;
