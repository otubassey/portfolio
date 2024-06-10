"use client";

import { HTMLAttributes, ReactEventHandler, memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { useGeneratedId } from "@/ui/hooks";
import { ClassesUtil } from "@/ui/utils";

const Size = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl"
} as const;

const LabelPosition = {
    END: "End",
    START: "Start",
    NONE: "None"
} as const;

const CLASSNAMES = {
    root: "inline-flex cursor-pointer items-center gap-3",
    input: "peer sr-only",
    span: {
        core: "tracking-wide font-medium text-primaryContrastText peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        [Size.SM]: "text-xs",
        [Size.MD]: "text-sm",
        [Size.LG]: "text-base",
        [Size.XL]: "text-lg"
    },
    div: {
        core: "relative rounded-full bg-slate-100 after:absolute after:bottom-0 after:left-[0.0625rem] " +
            "after:top-0 after:my-auto after:rounded-full after:bg-slate-700 after:transition-all after:content-[''] " +
            "peer-checked:bg-primaryLight peer-checked:after:bg-primaryDark peer-focus:outline peer-focus:outline-2 peer-focus:outline-offset-2 " +
            "peer-focus:outline-slate-800 peer-active:outline-offset-0 peer-disabled:cursor-not-allowed " +
            "peer-disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:after:bg-slate-300 dark:peer-checked:bg-default " +
            "dark:peer-checked:after:bg-primaryDark dark:peer-focus:outline-slate-300 dark:peer-focus:peer-checked:outline-primaryLight",
        [Size.SM]: "h-5 w-9 after:h-4 after:w-4 peer-checked:after:translate-x-4",
        [Size.MD]: "h-6 w-11 after:h-5 after:w-5 peer-checked:after:translate-x-5",
        [Size.LG]: "h-7 w-12 after:h-6 after:w-6 peer-checked:after:translate-x-5",
        [Size.XL]: "h-8 w-14 after:h-7 after:w-7 peer-checked:after:translate-x-6"
    }
} as const;

type SwitchSize = typeof Size[keyof typeof Size];

type SwitchLabelPosition = typeof LabelPosition[keyof typeof LabelPosition];

type LabelProps = {
    position: SwitchLabelPosition
};

type Props = {
    checked: boolean;
    inputProps?: HTMLAttributes<HTMLInputElement>;
    label?: string;
    labelProps?: LabelProps;
    onChange: ReactEventHandler;
    size?: SwitchSize;
};

Switch.protoTypes = {
    checked: PropTypes.bool,
    inputProps: PropTypes.object,
    label: PropTypes.string,
    labelProps: PropTypes.shape({
        position: PropTypes.oneOf(Object.values(LabelPosition))
    }),
    onChange: PropTypes.func,
    size: PropTypes.oneOf(Object.values(Size))
};

function Switch({
    checked = false,
    inputProps,
    label,
    labelProps,
    onChange,
    size
}: Props) {
    const componentId = useGeneratedId();
    const componentSize = size ?? Size.SM;
    const componentLabelPosition = labelProps?.position ?? LabelPosition.START;
    return (
        <label htmlFor={componentId} className={CLASSNAMES.root}>
            <input
                id={componentId}
                type="checkbox"
                className={CLASSNAMES.input}
                role="switch"
                checked={checked}
                onChange={onChange}
                {...(inputProps ?? {})}
            />
            {
                componentLabelPosition === LabelPosition.START &&
                <span className={ClassesUtil.concat(CLASSNAMES.span.core, CLASSNAMES.span[componentSize])}>{label}</span>
            }
            <div className={ClassesUtil.concat(CLASSNAMES.div.core, CLASSNAMES.div[componentSize])} aria-hidden="true"></div>
            {
                componentLabelPosition === LabelPosition.END &&
                <span className={ClassesUtil.concat(CLASSNAMES.span.core, CLASSNAMES.span[componentSize])}>{label}</span>
            }
        </label>
    );
}

export default memo(withDisplayName()(Switch));
