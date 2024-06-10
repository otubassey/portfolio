import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils/";
import {Variant} from "@/ui/widgets/title";

const CLASSNAMES = {
    indicator: "mr-4 h-2 w-2 rounded-full bg-slate-300",
    paragraph: "flex items-center py-3",
    primary: "tracking-widest text-slate-200"
} as const;

type ClassNameProp = {
    root?: string | null;
    indicator?: string | null;
    paragraph?: string | null;
    primary?: string | null;
    secondary?: string;
};

type TextProps = {
    component?: ElementType | null;
    variant?: Variant;
};

export type Props = {
    children?: ReactNode;
    classes?: ClassNameProp | null; // classes
    component?: ElementType | null;
    hideIndicator?: boolean,
    primary?: string | null;
    seconday?: string | null;
    textProps?: TextProps | null;
};

ListItemText.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.string,
    component: PropTypes.elementType,
    hideIndicator: PropTypes.bool,
    primary: PropTypes.string,
    seconday: PropTypes.string,
    textProps: PropTypes.shape({
        component: PropTypes.elementType,
        variant: PropTypes.object
    })
};

function ListItemText({
    children = null,
    classes = null,
    component = null,
    hideIndicator = false,
    primary = null,
    seconday = null,
    textProps = null,
    ...otherComponentProps
}: Props, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "li";
    const {component: textComponent, ...otherTextProps} = textProps ?? {};
    const TextComponent = textComponent ?? "p";
    return (
        <Component ref={ref} className={classes?.root} {...otherComponentProps}>
            {
                !children
                ? (
                    <TextComponent className={ClassesUtil.concat(CLASSNAMES.paragraph, classes?.paragraph)} {...otherTextProps}>
                        {
                            !hideIndicator &&
                            <span className={ClassesUtil.concat(classes?.indicator, CLASSNAMES.indicator)}></span>
                        }
                        <span className={ClassesUtil.concat(classes?.primary, CLASSNAMES.primary)}>{primary}</span>
                        <span className={classes?.secondary}>{seconday}</span>
                    </TextComponent>
                )
                : children
            }
        </Component>
    );
}

export default forwardRef<HTMLElement, Props>(withDisplayName()(ListItemText));
