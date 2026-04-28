"use client";

import { createContext } from "react";

import { NavigationState } from "./types";

const NavigationContext = createContext<NavigationState | null>(null);

export default NavigationContext;
