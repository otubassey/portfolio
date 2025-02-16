import { NavigationLabel } from "./navigation.constants";

export type NavigationLabelType = typeof NavigationLabel[keyof typeof NavigationLabel];
export type NavigationSelectEventHandler = (value: NavigationLabelType | null) => void;
