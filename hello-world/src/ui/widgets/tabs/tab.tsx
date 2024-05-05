"use client";

import { ChangeEvent, ForwardedRef, ReactElement, ReactNode, forwardRef, useCallback } from "react";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

const CLASSNAMES = {
    root: "px-4 py-1 cursor-pointer",
    active: "border-b text-sky-300 border-t border-t-transparent border-b-sky-300",
    inactive: "bg-slate-700/50"
} as const;

type OnChangeEventHandler = (event: ChangeEvent<HTMLInputElement>, value: any) => void;

type TabProps = {
    active: boolean;
    className?: string | null;
    onChange?: OnChangeEventHandler | null;
    label?: ReactNode;
    value?: any;
};

function Tab({
    active = false,
    className = null,
    onChange = null,
    label = null,
    value = null,
    ...otherProps
}: TabProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement {
    const handleClick = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event, value ?? 0);
    }, [onChange]);
    return (
        <button
            ref={ref}
            type="button"
            className={ClassesUtil.concat(CLASSNAMES.root, {[CLASSNAMES.active]: active, [CLASSNAMES.inactive]: !active}, className)}
            onClick={handleClick}
            {...otherProps}>
            {label}
        </button>
    );
}

export default forwardRef<HTMLButtonElement, TabProps>(withDisplayName<TabProps>()(Tab));
