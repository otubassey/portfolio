import { ChangeEvent, memo } from "react";
import Immutable from "immutable";

import { displayName } from "@/hwiui/decorator";
import { ThemeName } from "@/hwiui/theme";
import { ArrayOf, ValuesOf } from "@/hwiui/widgets/common";
import { Typography } from "@/hwiui/widgets/typography";

import Radio from "./radio";

const ThemeLabel = {
    // [ThemeName.BLACK_N_WHITE]: "Black n White",
    [ThemeName.BLACK_N_WHITE]: "Monochrome",
    [ThemeName.DARK_CLASSIC]: "Dark Classic",
    [ThemeName.DARK_CLASSIC_WITH_A_TWIST]: "Dark Classic With a twist",
    [ThemeName.DARK_MODERN_MINIMALIST]: "Dark Modern Minimalist",
    [ThemeName.DARK_NATURE_INSPIRED]: "Dark Nature Inspired",
    [ThemeName.DARK_TECH_INSPIRED]: "Dark Tech Inspired",
    [ThemeName.LIGHT_MODERN_MINIMALIST]: "Light Modern Minimalist",
    [ThemeName.LIGHT_NATURE_INSPIRED]: "Light Nature Inspired",
    [ThemeName.LIGHT_TECH_INSPIRED]: "Light Tech Inspired",
    // [ThemeName.WHITE_N_BLACK]: "White n Black"
    [ThemeName.WHITE_N_BLACK]: "Monochrome"
} as const;

function splitList(list: ArrayOf<typeof ThemeName>, maxElementCount: number): Immutable.List<ArrayOf<typeof ThemeName>> {
    if(!Immutable.isList(list)) {
        return Immutable.List();
    }
    let listCollection: Immutable.List<ArrayOf<typeof ThemeName>> = Immutable.List();
    let currentSubArray = Immutable.List();
    for(let i = 0; i < list.size; i++) {
        currentSubArray = currentSubArray.push(list.get(i));
        if(currentSubArray.size === maxElementCount) {
            listCollection = listCollection.push(currentSubArray);
            currentSubArray = Immutable.List();
        }
    }
    if(currentSubArray.size > 0) {
        listCollection = listCollection.push(currentSubArray);
    }
    return listCollection;
}

type Props = {
    options: ArrayOf<typeof ThemeName>;
    value?: ValuesOf<typeof ThemeName>;
    onChange: (event: ValuesOf<typeof ThemeName>) => void;
};

const Themes = ({options, value: selectedValue, onChange}: Props) => {
    const themeLists = splitList(options, 4);
    console.log("tagged-Themes: valA =", {
        options: options?.toJS(),
        selectedValue,
        themeLists: themeLists?.toJS()
    });
    return (
        <fieldset className="gap-3">
            <Typography variant="title"><legend>Themes</legend></Typography>
            <div className="flex gap-x-8">
                {
                    themeLists.map((themes, index) => (
                        <div key={index}>
                            {
                                themes.map(value => (
                                    <Radio
                                        key={value}
                                        checked={value === selectedValue}
                                        disabled={!options?.includes?.(value)}
                                        label={ThemeLabel[value] ?? "Unknown"}
                                        name="theme"
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
                                        value={value}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </fieldset>
    );
};

export default memo(displayName()(Themes));
