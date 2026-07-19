"use client";

import { createContext } from "react";

import { ApplicationContextValue } from "./types";

const ApplicationContext = createContext<ApplicationContextValue | null>(null);

export default ApplicationContext;
