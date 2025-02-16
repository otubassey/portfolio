import { ChangeEvent, memo } from "react";

import { displayName } from "@/hwiui/decorator";
import { ThemeMode as ThemeModeEnum } from "@/hwiui/theme";
import { ValuesOf } from "@/hwiui/widgets/common";
import { Typography } from "@/hwiui/widgets/typography";
import { StringUtil } from "@/hwiutils";

import Radio from "./radio";

type Props = {
    options?: ValuesOf<typeof ThemeModeEnum>;
    value?: ValuesOf<typeof ThemeModeEnum>;
    onChange: (value: ValuesOf<typeof ThemeModeEnum>) => void;
};

const ThemeMode = ({options, value: selectedValue, onChange}: Props) => {
    console.log("tagged-ThemeMode: valA =", {
        options,
        selectedValue
    });
    return (
        <fieldset className="gap-3">
            <Typography variant="title"><legend>Theme Mode</legend></Typography>
            {
                options?.map(value => (
                    <Radio
                        key={value}
                        checked={value === selectedValue}
                        label={StringUtil.capitalize(value)}
                        name="mode"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
                        value={value}
                    />
                ))
            }
        </fieldset>
    );
};

export default memo(displayName()(ThemeMode));
