import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { ClassesUtil } from "../../utils";

import {Variant} from "@/ui/widgets/title";

const CLASSNAMES = {
    indicator: "mr-4 h-2 w-2 rounded-full bg-slate-300",
    paragraph: "flex items-center py-3",
    primary: "tracking-widest text-slate-200"
} as const;

type ClassNameProp = {
    root?: string | null,
    indicator?: string | null,
    paragraph?: string | null,
    primary?: string | null,
    secondary?: string,
};

type TextProps = {
    component?: ElementType | null,
    variant?: Variant
};

export type ListItemTextProps = {
    children?: ReactNode,
    component?: ElementType | null,
    className?: ClassNameProp | null,
    hideIndicator?: boolean,
    primary?: string | null,
    seconday?: string | null,
    textProps?: TextProps | null
};

function ListItemText({
    children = null,
    className = null,
    component = null,
    hideIndicator = false,
    primary = null,
    seconday = null,
    textProps = null,
    ...otherComponentProps
}: ListItemTextProps, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "li";
    const {component: textComponent, ...otherTextProps} = textProps ?? {};
    const TextComponent = textComponent ?? "p";
    return (
        <Component ref={ref} className={className?.root} {...otherComponentProps}>
            {
                !children
                ? (
                    <TextComponent className={ClassesUtil.concat(CLASSNAMES.paragraph, className?.paragraph)} {...otherTextProps}>
                        {
                            !hideIndicator &&
                            <span className={ClassesUtil.concat(className?.indicator, CLASSNAMES.indicator)}></span>
                        }
                        <span className={ClassesUtil.concat(className?.primary, CLASSNAMES.primary)}>{primary}</span>
                        <span className={className?.secondary}>{seconday}</span>
                    </TextComponent>
                )
                : children
            }
        </Component>
    );
}

export default forwardRef<HTMLElement, ListItemTextProps>(ListItemText);
