export const NavigationLabel = {
    EXPERIENCES: "Experiences",
    // HISTORY: "History", this should be displayed in settings modal with theme options - this will open a modal that will allow for selecting: theme, previous versions of site
    HOME: "Home",
    PROJECTS: "Projects",
    SETTINGS: "Settings",
    SKILLS: "Skills"
} as const;

const {EXPERIENCES, HOME, PROJECTS, SETTINGS, SKILLS} = NavigationLabel;
export const HeaderNavBarNavigationLabels = [
    HOME,
    SKILLS,
    EXPERIENCES,
    PROJECTS
] as const;

export const MobileFabNavigationLabels = [
    SETTINGS,
    HOME,
    SKILLS,
    EXPERIENCES,
    PROJECTS
] as const;

export const NonMobileFabNavigationLabels = [
    SETTINGS
] as const;
