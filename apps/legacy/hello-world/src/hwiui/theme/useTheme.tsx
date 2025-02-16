import { useContext } from "react";

import { ThemeContext } from "./context";
import {ThemeContextParams} from "./types";

const useTheme = (): ThemeContextParams => useContext(ThemeContext);

export default useTheme;
