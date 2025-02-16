import {createContext} from "react";

import { ThemeContextParams } from "./types";

export const ThemeContext = createContext<ThemeContextParams>({theme: null, onChange: () => {}, onReset: () => {}});
