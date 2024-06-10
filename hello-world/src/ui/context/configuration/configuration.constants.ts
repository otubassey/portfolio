export const ThemeVariants = {
    DARK: "dark",
    LIGHT: "light"
} as const;

export const InitialConfiguration = {
    theme: {
        name: "Helloworld",
        variant: {
            sameAlways: false,
            type: ThemeVariants.DARK
        }
    }
} as const;
