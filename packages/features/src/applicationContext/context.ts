"use client";

import { createContext } from "react";

import { ApplicationContextType } from "./types";

const ApplicationContext = createContext<ApplicationContextType | null>(null);

export default ApplicationContext;
