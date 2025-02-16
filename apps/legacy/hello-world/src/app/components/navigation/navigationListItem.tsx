"use client";

import { memo, useCallback } from "react";

import { displayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";
import ListItemButton from "@/hwiui/widgets/list/listItemButton";

import { NavigationSelectEventHandler, NavigationLabelType } from "./navigation.types";

const CLASSNAMES = {
    root: "w-max cursor-pointer",
    text: {
        root: "group flex items-center py-3 active",
        indicator: {
            regular: "mr-4 h-4 w-4 rounded-full bg-slate-600 transition-all group-hover:h-1 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none",
            higlighted: "mr-4 rounded-full h-1 w-16 bg-slate-200"
        },
        label: {
            regular: "text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 group-hover:text-lg",
            higlighted: "mr-8 text-lg font-bold uppercase tracking-widest text-slate-200"
        }
    }
} as const;

type Props = {
    label: string | null,
    onClick: NavigationSelectEventHandler | null,
    value: NavigationLabelType | null,
    selected?: boolean
};

function NavigationListItem({
    label = null,
    onClick = null,
    value = null,
    selected = false
}: Props) {
    const handleOnSelect = useCallback(() => {
        onClick?.(value);
    }, [onClick, value]);
    return (
        <ListItemButton className={CLASSNAMES.root} onClick={handleOnSelect} value={value} aria-label={label}>
            <p className={CLASSNAMES.text.root}>
                <span className={ClassesUtils.concat({[CLASSNAMES.text.indicator.higlighted]: selected, [CLASSNAMES.text.indicator.regular]: !selected})}></span>
                <span className={ClassesUtils.concat({[CLASSNAMES.text.label.higlighted]: selected, [CLASSNAMES.text.label.regular]: !selected})}>{label}</span>
            </p>
        </ListItemButton>
    );   
}

export default memo(displayName<Props>()(NavigationListItem));
