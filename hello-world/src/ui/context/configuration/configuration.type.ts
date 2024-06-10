import { SetStateAction } from "react";
import { ThemeVariants } from "./configuration.constants";

export type ThemeVariant = typeof ThemeVariants[keyof typeof ThemeVariants];

export type ThemeConfiguration = {
    name: "Helloworld";
    variant: {
        sameAlways: boolean,
        type: ThemeVariant
    };
};

export type Configuration = {
    theme: ThemeConfiguration;
};

export type OnConfigurationChange = (value: SetStateAction<Configuration> | Configuration) => void;