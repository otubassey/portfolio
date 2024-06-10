import {createContext} from "react";
import { InitialConfiguration } from "./configuration.constants";
import { Configuration, OnConfigurationChange } from "./configuration.type";

export const ConfigurationContext = createContext<[Configuration, OnConfigurationChange | null]>([InitialConfiguration, null]);
