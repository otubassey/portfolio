import { memo, useCallback } from "react";
import Immutable from "immutable";

import { displayName } from "@/hwiui/decorator";
import { usePrevious } from "@/hwiui/hooks";
import {
    OnThemeChange,
    ThemeMode as ThemeModeEnum,
    ThemeName,
    ThemeType,
    ThemeUtils
} from "@/hwiui/theme";
import { ValuesOf } from "@/hwiui/widgets/common";

import Actions from "./actions";
import ThemeMode from "./themeMode";
import Themes from "./themes";

type Props = {
    theme: ThemeType;
    onThemeChange: OnThemeChange;
    onResetTheme: () => void;
};

const Settings = ({theme, onThemeChange, onResetTheme}: Props) => {
    const previousTheme = usePrevious(theme);
    const handleThemeModeChange = useCallback((themeMode: ValuesOf<typeof ThemeModeEnum>) => {
        onThemeChange?.(theme!.setIn(["current", "mode"], themeMode));
    }, [theme, onThemeChange]);
    const handleThemeNameChange = useCallback((themeName: ValuesOf<typeof ThemeName>) => {
        onThemeChange?.(theme!.setIn(["current", "name"], themeName));
    }, [theme, onThemeChange]);
    const handleThemeRememberChange = useCallback((remember: boolean) => {
        onThemeChange?.(theme!.setIn(["current", "remember"], remember));
    }, [theme, onThemeChange]);
    return (
        <div className="flex place-content-between p-3">
            <ThemeMode options={theme.get("modes")} value={theme.getIn(["current", "mode"])} onChange={handleThemeModeChange} />
            <Themes
                onChange={handleThemeNameChange}
                options={ThemeUtils.getNamesByColorScheme(theme.getIn(["current", "isDarkColoredScheme"]))}
                value={theme.getIn(["current", "name"])}
            />
            <Actions
                onRememberChange={handleThemeRememberChange}
                onReset={onResetTheme}
                remember={theme.getIn(["current", "remember"])}
                disableReset={!previousTheme || Immutable.is(theme, previousTheme)}
            />
        </div>
    );
};

export default memo(displayName()(Settings));
