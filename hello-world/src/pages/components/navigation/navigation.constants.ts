export const NAVIGATION = {
    EXPERIENCES: "Experiences",
    // HISTORY: "History", this should be displayed in settings modal with theme options - this will open a modal that will allow for selecting: theme, previous versions of site
    HOME: "Home",
    PROJECTS: "Projects",
    SETTINGS: "Settings",
    SKILLS: "Skills"
} as const;

const {EXPERIENCES, HOME, PROJECTS, SETTINGS, SKILLS} = NAVIGATION;
export const HEADER_NAV_BAR_NAVIGATION = [
    HOME,
    SKILLS,
    EXPERIENCES,
    PROJECTS
] as const;

export const FAB_MOBILE_SCREEN_NAVIGATION = [
    SETTINGS,
    HOME,
    SKILLS,
    EXPERIENCES,
    PROJECTS
] as const;

export const FAB_NON_MOBILE_SCREEN_NAVIGATION = [
    SETTINGS
] as const;
