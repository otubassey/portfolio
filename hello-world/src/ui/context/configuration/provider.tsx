"use client";

import {ReactNode, Reducer, SetStateAction, useCallback, useEffect, useLayoutEffect, useReducer} from "react";
import debounce from "debounce";

import { withDisplayName } from "@/ui/decorator";
import { getDeviceType } from "@/ui/utils";

import { InitialConfiguration, ThemeVariants } from "./configuration.constants";
import { Configuration, OnConfigurationChange, ThemeConfiguration, ThemeVariant } from "./configuration.type";
import { ConfigurationContext } from "./context";

const LocalStorageKeys = {
    THEME: "HELLO-WORLD-THEME-KEY"
} as const;

const ThemeLocalStorageAccessor = ({
    get: () => localStorage.getItem(LocalStorageKeys.THEME),
    remove: () => {
        localStorage.removeItem(LocalStorageKeys.THEME);
    },
    set: theme => {
        localStorage.setItem(LocalStorageKeys.THEME, JSON.stringify(theme));
    }
});

function isThemeConfigurationEqual(previous: ThemeConfiguration, newValue: ThemeConfiguration): boolean {
    return Boolean(previous && newValue)
        && previous.name === newValue.name
        && previous.variant.type === newValue.variant.type
        && previous.variant.sameAlways === newValue.variant.sameAlways;
}

function isConfigurationEqual(previous: Configuration, newValue: Configuration): boolean {
    if(!previous) {
        return !newValue;
    }
    return isThemeConfigurationEqual(previous.theme, newValue.theme) && previous.deviceType === newValue.deviceType;
}

function updateTheme(previousVariantType: ThemeVariant, currentVariantType: ThemeVariant) {
    if(currentVariantType !== previousVariantType) {
        const currentThemeVariantClassName = previousVariantType === ThemeVariants.LIGHT
            ? `theme-${ThemeVariants.LIGHT}`
            : `theme-${ThemeVariants.DARK}`;
        const newThemeVariantClassName = previousVariantType === ThemeVariants.LIGHT
            ? `theme-${ThemeVariants.DARK}`
            : `theme-${ThemeVariants.LIGHT}`;

        document.querySelector("body")?.classList?.replace(currentThemeVariantClassName, newThemeVariantClassName);
    }
}

const ConfigurationActions = {
    LOCAL_STORAGE_SYNC: "local-storage-synchorization",
    UPDATE: "update"
} as const;

type ConfigurationReducerAction = {
    type: typeof ConfigurationActions[keyof typeof ConfigurationActions],
    payload: SetStateAction<Configuration> | Configuration
};

function configurationReducer(currentConfiguration: Configuration, {type, payload}: ConfigurationReducerAction) {
    const modifiedConfiguration: Configuration = typeof payload === "function" ? payload(currentConfiguration) : payload;
    if(type === ConfigurationActions.LOCAL_STORAGE_SYNC) {
        updateTheme(currentConfiguration.theme.variant.type, modifiedConfiguration.theme.variant.type);
        return modifiedConfiguration;
    }
    if(type === ConfigurationActions.UPDATE) {
        if(!isConfigurationEqual(currentConfiguration, modifiedConfiguration)) {
            if(!isThemeConfigurationEqual(modifiedConfiguration.theme, currentConfiguration.theme)) {
                updateTheme(currentConfiguration.theme.variant.type, modifiedConfiguration.theme.variant.type);

                if(!modifiedConfiguration.theme.variant.sameAlways) {
                    ThemeLocalStorageAccessor.remove();
                } else {
                    ThemeLocalStorageAccessor.set(modifiedConfiguration.theme);
                }
            }
            return modifiedConfiguration;
        }
        return currentConfiguration;
    }
    return currentConfiguration;
}

function useConfiguration(initialValue: Configuration): [Configuration, OnConfigurationChange] {
    const [configuration, dispatcher] = useReducer<Reducer<Configuration, ConfigurationReducerAction>>(configurationReducer, initialValue);
    const handleConfigurationChange = useCallback((updatedConfiguration: SetStateAction<Configuration> | Configuration) => {
        dispatcher({type: ConfigurationActions.UPDATE, payload: updatedConfiguration});
    }, []);
    useLayoutEffect(() => {
        const localStorageValue = ThemeLocalStorageAccessor.get();
        const initialConfigurationValue: Configuration = {
            ...initialValue,
            theme: JSON.parse(localStorageValue) ?? initialValue.theme
        };
        dispatcher({type: ConfigurationActions.LOCAL_STORAGE_SYNC, payload: initialConfigurationValue});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue]);

    return [configuration, handleConfigurationChange];
}

type Props = {
    children: ReactNode
};

function Provider({children}: Props) {
    const [configuration, setConfiguration] = useConfiguration(InitialConfiguration);
    useEffect(() => {
        const debouncedResizeHandler = debounce(() => {
            setConfiguration({...configuration, deviceType: getDeviceType()});
        }, 500);
        const handleResize = () => {
            debouncedResizeHandler();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ConfigurationContext.Provider value={[configuration, setConfiguration]}>{children}</ConfigurationContext.Provider>
    );
}

export default withDisplayName()(Provider);
