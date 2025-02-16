import { ForwardedRef, ReactEventHandler, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { useGeneratedId } from "@/hwiui/hooks";
import { ClassesUtils } from "@/hwiutils";

export const SwitchSize = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl"
} as const;

export const LabelPosition = {
    END: "end",
    START: "start",
    NONE: "none"
} as const;

const CLASSNAMES = {
    root: "inline-flex cursor-pointer items-center",
    input: "peer sr-only",
    span: {
        core: "tracking-wide font-medium text-primaryContrastText peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        [SwitchSize.SM]: "text-xs",
        [SwitchSize.MD]: "text-sm",
        [SwitchSize.LG]: "text-base",
        [SwitchSize.XL]: "text-lg"
    },
    div: {
        core: "relative rounded-full bg-slate-100 after:absolute after:bottom-0 after:left-[0.0625rem] " +
            "after:top-0 after:my-auto after:rounded-full after:bg-slate-700 after:transition-all after:content-[''] " +
            "peer-checked:bg-primaryLight peer-checked:after:bg-primaryDark peer-focus:outline peer-focus:outline-2 peer-focus:outline-offset-2 " +
            "peer-focus:outline-slate-800 peer-active:outline-offset-0 peer-disabled:cursor-not-allowed " +
            "peer-disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:after:bg-slate-300 dark:peer-checked:bg-default " +
            "dark:peer-checked:after:bg-primaryDark dark:peer-focus:outline-slate-300 dark:peer-focus:peer-checked:outline-primaryLight",
        [SwitchSize.SM]: "h-5 w-9 after:h-4 after:w-4 peer-checked:after:translate-x-4",
        [SwitchSize.MD]: "h-6 w-11 after:h-5 after:w-5 peer-checked:after:translate-x-5",
        [SwitchSize.LG]: "h-7 w-12 after:h-6 after:w-6 peer-checked:after:translate-x-5",
        [SwitchSize.XL]: "h-8 w-14 after:h-7 after:w-7 peer-checked:after:translate-x-6"
    }
} as const;

export type SwitchSizeType = typeof SwitchSize[keyof typeof SwitchSize];

type SwitchLabelPosition = typeof LabelPosition[keyof typeof LabelPosition];

type LabelProps = {
    position: SwitchLabelPosition
};

type Props = {
    checked: boolean;
    label?: string;
    labelProps?: LabelProps;
    onChange: ReactEventHandler;
    size?: SwitchSizeType;
};

const Switch = forwardRef<HTMLLabelElement, Props>(({
    checked = false,
    label,
    labelProps,
    onChange,
    size
}: Props, ref: ForwardedRef<HTMLLabelElement>) => {
    const componentId = useGeneratedId();
    const componentSize = size ?? SwitchSize.SM;
    const componentLabelPosition = labelProps?.position ?? LabelPosition.START;
    return (
        <label ref={ref} htmlFor={componentId} className={ClassesUtils.concat(CLASSNAMES.root, {["gap-3"]: Boolean(label)})}>
            <input
                id={componentId}
                type="checkbox"
                className={CLASSNAMES.input}
                role="switch"
                checked={checked}
                onChange={onChange}
            />
            {
                componentLabelPosition === LabelPosition.START &&
                <span className={ClassesUtils.concat(CLASSNAMES.span.core, CLASSNAMES.span[componentSize])}>{label}</span>
            }
            <div className={ClassesUtils.concat(CLASSNAMES.div.core, CLASSNAMES.div[componentSize])} aria-hidden="true"></div>
            {
                componentLabelPosition === LabelPosition.END &&
                <span className={ClassesUtils.concat(CLASSNAMES.span.core, CLASSNAMES.span[componentSize])}>{label}</span>
            }
        </label>
    );
});

Switch.displayName = getDisplayName(Switch);

Switch.propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string,
    labelProps: PropTypes.shape({
        position: PropTypes.oneOf(Object.values(LabelPosition))
    }),
    onChange: PropTypes.func,
    size: PropTypes.oneOf(Object.values(SwitchSize))
};

export default Switch;
