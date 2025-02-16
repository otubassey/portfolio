import { ReactNode, ElementType, forwardRef, ForwardedRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "next/dist/shared/lib/utils";

import { ValuesOf } from "../common";
import { ClassesUtils } from "@/hwiutils";

export const TypographyColor = {
    DISABLED: "disabled",
    ERROR: "error",
    INFO: "info",
    INHERIT: "inherit",
    INITIAL: "initial",
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    WARNING: "warning"
};

export const TypographyVariant = {
    BODY: "body",
    BODY2: "body2",
    BODY_BOLD: "bodyBold",
    BUTTON: "button",
    HEADING1: "h1",
    HEADING2: "h2",
    HEADING3: "h3",
    HEADING4: "h4",
    HEADING5: "h5",
    HEADING6: "h6",
    LABEL: "label",
    SUB_TITLE: "subTitle",
    TITLE: "title"
} as const;

const ClassNamesByVariant = {
    [TypographyVariant.BODY]: "font-normal",
    [TypographyVariant.BODY2]: "font-normal",
    [TypographyVariant.BODY_BOLD]: "font-bold",
    [TypographyVariant.BUTTON]: "font-medium uppercase",
    [TypographyVariant.HEADING1]: "font-extrabold",
    [TypographyVariant.HEADING2]: "font-extrabold",
    [TypographyVariant.HEADING3]: "font-extrabold",
    [TypographyVariant.HEADING4]: "font-bold",
    [TypographyVariant.HEADING5]: "font-bold",
    [TypographyVariant.HEADING6]: "font-bold",
    [TypographyVariant.LABEL]: "font-bold",
    [TypographyVariant.SUB_TITLE]: "font-medium",
    [TypographyVariant.TITLE]: "font-medium"
} as const;

const ColorClassesByColor = {
    [TypographyColor.DISABLED]: "text-typography-textDisabled",
    [TypographyColor.ERROR]: "text-error",
    [TypographyColor.INFO]: "text-info",
    [TypographyColor.INHERIT]: "text-typography-textPrimary",
    [TypographyColor.INITIAL]: "text-typography-textPrimary",
    [TypographyColor.PRIMARY]: "text-primary",
    [TypographyColor.SECONDARY]: "text-secondary",
    [TypographyColor.SUCCESS]: "text-success",
    [TypographyColor.WARNING]: "text-warning"
} as const;

const DefaultColorClassNameByVariant = {
    [TypographyVariant.BODY]: "text-typography-textPrimary",
    [TypographyVariant.BODY2]: "text-typography-textSecondary",
    [TypographyVariant.BODY_BOLD]: "text-typography",
    [TypographyVariant.BUTTON]: "text-typography",
    [TypographyVariant.HEADING1]: "text-typography-title",
    [TypographyVariant.HEADING2]: "text-typography-title",
    [TypographyVariant.HEADING3]: "text-typography-title",
    [TypographyVariant.HEADING4]: "text-typography-title",
    [TypographyVariant.HEADING5]: "text-typography-title",
    [TypographyVariant.HEADING6]: "text-typography-title",
    [TypographyVariant.LABEL]: "text-typography-title",
    [TypographyVariant.SUB_TITLE]: "text-typography-subTitle",
    [TypographyVariant.TITLE]: "text-typography-title"
} as const;

const TypographyElement = {
    PARAGRAPH: "p",
    SPAN: "span",
    HEADING1: "h1",
    HEADING2: "h2",
    HEADING3: "h3",
    HEADING4: "h4",
    HEADING5: "h5",
    HEADING6: "h6"
} as const;

const ElementByVariant = {
    [TypographyVariant.BODY]: TypographyElement.PARAGRAPH,
    [TypographyVariant.BODY2]: TypographyElement.PARAGRAPH,
    [TypographyVariant.BODY_BOLD]: TypographyElement.PARAGRAPH,
    [TypographyVariant.BUTTON]: TypographyElement.SPAN,
    [TypographyVariant.HEADING1]: TypographyElement.HEADING1,
    [TypographyVariant.HEADING2]: TypographyElement.HEADING2,
    [TypographyVariant.HEADING3]: TypographyElement.HEADING3,
    [TypographyVariant.HEADING4]: TypographyElement.HEADING4,
    [TypographyVariant.HEADING5]: TypographyElement.HEADING5,
    [TypographyVariant.HEADING6]: TypographyElement.HEADING6,
    [TypographyVariant.LABEL]: TypographyElement.SPAN,
    [TypographyVariant.SUB_TITLE]: TypographyElement.HEADING5,
    [TypographyVariant.TITLE]: TypographyElement.HEADING4
} as const;

const SizeClassNameByVariant = {
    [TypographyVariant.BODY]: "text-base",
    [TypographyVariant.BODY2]: "text-sm",
    [TypographyVariant.BODY_BOLD]: "text-lg",
    [TypographyVariant.BUTTON]: "text-base",
    [TypographyVariant.HEADING1]: "text-8xl",
    [TypographyVariant.HEADING2]: "text-7xl",
    [TypographyVariant.HEADING3]: "text-6xl",
    [TypographyVariant.HEADING4]: "text-5xl",
    [TypographyVariant.HEADING5]: "text-4xl",
    [TypographyVariant.HEADING6]: "text-3xl",
    [TypographyVariant.LABEL]: "text-xl",
    [TypographyVariant.SUB_TITLE]: "text-2xl",
    [TypographyVariant.TITLE]: "text-2xl"
} as const;

function getColorClassName(variant: ValuesOf<typeof TypographyVariant>, color?: ValuesOf<typeof TypographyColor> | null): string {
    if(!color) {
        const matchedColorClassByVariant = DefaultColorClassNameByVariant[variant];
        if(matchedColorClassByVariant) {
            return matchedColorClassByVariant;
        }
        return ColorClassesByColor[TypographyColor.INHERIT];
    }
    const matchedColorClassByColor = ColorClassesByColor[color];
    if(matchedColorClassByColor) {
        return matchedColorClassByColor;
    }
    return color;
}

function getComponentElement(variant: ValuesOf<typeof TypographyVariant>, componentProp?: ElementType): ElementType {
    if(componentProp) {
        return componentProp;
    }
    return ElementByVariant[variant] ?? ElementByVariant[TypographyVariant.BODY];
}

export type TypographyProps = {
    children?: ReactNode;
    className?: string | null;
    color?: ValuesOf<typeof TypographyColor> | null;
    component?: ElementType;
    gutterBottom?: boolean;
    variant?: ValuesOf<typeof TypographyVariant>;
};

// TODO: add aria label and other accessibilities
const Typography = forwardRef<HTMLElement, TypographyProps>(({
    children,
    className = null,
    color: colorProp,
    component: componentProp,
    gutterBottom = false,
    variant: variantProp,
    ...otherProps
}: TypographyProps, ref: ForwardedRef<HTMLElement>) => {
    const variant = variantProp ?? TypographyVariant.BODY;
    const Component = getComponentElement(variant, componentProp);
    const colorClassName = getColorClassName(variant, colorProp);
    const sizeClassName = SizeClassNameByVariant[variant] ?? SizeClassNameByVariant[TypographyVariant.BODY];
    const variantClassName = ClassNamesByVariant[variant] ?? ClassNamesByVariant[TypographyVariant.BODY];
    return (
        <Component
            className={ClassesUtils.merge(
                colorClassName,
                sizeClassName,
                variantClassName,
                className,
                [gutterBottom && "mb-1.5"]
            )}
            ref={ref}
            {...otherProps}>
            {children}
        </Component>
    );
});

Typography.displayName = getDisplayName(Typography);

Typography.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.values(TypographyColor)),
    component: PropTypes.elementType,
    gutterBottom: PropTypes.bool,
    variant: PropTypes.oneOf(Object.values(TypographyVariant))
};

export default Typography;
