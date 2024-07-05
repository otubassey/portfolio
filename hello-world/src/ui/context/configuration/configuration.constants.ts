import {getDeviceType} from "@/ui/utils/";

export const ThemeVariants = {
    DARK: "dark",
    LIGHT: "light"
} as const;

export const InitialConfiguration = {
    deviceType: getDeviceType(),
    theme: {
        name: "Helloworld",
        variant: {
            sameAlways: false,
            type: ThemeVariants.DARK
        }
    }
} as const;
