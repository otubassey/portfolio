import { AppDetail, MainPageSectionType, MainPageType } from "../constants";

export type OnAppDetailSelectHandler = (appVersion: AppDetail | null) => void;

export type OnPageSectionSelectHandler = (pageSection: MainPageSectionType | null) => void;

export type OnPageSelectHandler = (page: MainPageType | null) => void;
