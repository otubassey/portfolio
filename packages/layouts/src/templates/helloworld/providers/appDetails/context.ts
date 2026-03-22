"use client";

import { createContext } from "react";

import { AppDetailsState } from "./types";

const AppDetailsContext = createContext<AppDetailsState | null>(null);

export default AppDetailsContext;
