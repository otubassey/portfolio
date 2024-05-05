import { NAVIGATION } from "./navigation.constants";

export type NavigationType = typeof NAVIGATION[keyof typeof NAVIGATION];
export type NavigationSelectEventHandler = (value: NavigationType | null) => void;
