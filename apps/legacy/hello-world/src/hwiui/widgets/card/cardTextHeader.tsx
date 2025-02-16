import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";
import { Variant } from "@/hwiui/widgets/title";

const DEFAULT_CLASS_NAMES = {
    root: "",
    icon: "",
    primary: "",
    secondary: "",
    textRoot: ""
} as const;

type TextProps = {
    component?: ElementType | null;
    variant?: Variant;
};

type ClassNameProp = {
    root?: string | null;
    icon?: string | null;
    primary?: string | null;
    secondary?: string | null;
    textRoot?: string | null;
};

type Props = {
    children?: ReactNode;
    className?: ClassNameProp | null;
    component?: ElementType | null;
    icon?: ReactNode;
    primary?: string | null;
    secondary?: string | null;
    textProps?: TextProps | null;
};

const CardTextHeader = forwardRef<HTMLElement, Props>(({
    children = null,
    className = null,
    component = null,
    icon = null,
    primary = null,
    secondary = null,
    textProps = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) => {
    const Component = component ?? "div";
    const {component: textComponent, ...otherTextProps} = textProps ?? {};
    const TextComponent = textComponent ?? "p";
    const classes = ClassesUtils.concat("flex flex-col", className?.root);
    const iconClasses = ClassesUtils.defaultIfFalsy(className?.icon, DEFAULT_CLASS_NAMES.icon);
    const primaryClasses = ClassesUtils.defaultIfFalsy(className?.primary, DEFAULT_CLASS_NAMES.primary);
    const secondaryClasses = ClassesUtils.defaultIfFalsy(className?.secondary, DEFAULT_CLASS_NAMES.secondary);
    const textClasses = ClassesUtils.defaultIfFalsy(className?.textRoot, DEFAULT_CLASS_NAMES.textRoot);
    return (
        <Component ref={ref} className={classes} {...otherProps}>
            {
                icon &&
                <div className={iconClasses}>
                    {icon}
                </div>
            }
            {
                primary &&
                <TextComponent className={textClasses} {...otherTextProps}>
                    <span className={primaryClasses}>{primary}</span>
                    {
                        secondary &&
                        <span className={secondaryClasses}>{secondary}</span>
                    }
                </TextComponent>
            }
            {children}
        </Component>
    );
});

CardTextHeader.displayName = getDisplayName(CardTextHeader);

CardTextHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    icon: PropTypes.node,
    primary: PropTypes.string,
    secondary: PropTypes.string
};

export default CardTextHeader;
