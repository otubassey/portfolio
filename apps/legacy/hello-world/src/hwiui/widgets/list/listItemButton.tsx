import { ForwardedRef, ReactEventHandler, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { ListStyleType } from "./list";
import ListItemBase, { ListItemBaseProps } from "./listItemBase";
import useListContext from "./useListContext";
import { ButtonBase, ButtonBaseAttributes } from "../button";

export type Props = ListItemBaseProps & {
    buttonProps?: ButtonBaseAttributes,
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: ReactEventHandler | null;
    selected?: boolean;
};

const ListItemButton = forwardRef<HTMLLIElement, Props>(({
    buttonProps,
    children = null,
    className: classNameProp,
    disabled: disabledProp = false,
    onClick = null,
    selected = false,
    ...listItemProps
}: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const listComponentContext = useListContext();
    const {
        color: buttonColor,
        className: buttonClassName,
        disabled: buttonDisabled,
        ...otherButtonProps
    } = buttonProps ?? {};
    return (
        <ListItemBase
            {...listItemProps}
            ref={ref}
            className={ClassesUtils.merge(
                "active:bg-action-active group",
                classNameProp,
                [
                    disabledProp && "text-typography-actionDisabled",
                    !disabledProp && selected && "text-primary bg-primary-actionSelected hover:bg-primary-actionFocus active:bg-primary-actionActive",
                    !disabledProp && !selected && "text-typography hover:bg-typography-actionHover"
                ]
            )}
            onClick={onClick}>
            <ButtonBase
                classes={{
                    root: ClassesUtils.merge(
                        "w-full p-3 m-0",
                        buttonClassName
                    ),
                    typography: "text-inherit"
                }}
                disabled={disabledProp ?? buttonDisabled}
                {...otherButtonProps ?? {}}>
                {
                    ListStyleType.STRETCH === listComponentContext.get("listStyleType") &&
                    <span
                        className={ClassesUtils.merge(
                            "mr-4 rounded-full",
                            [
                                disabledProp && "h-4 w-4 bg-typography-actionDisabled",
                                !disabledProp && selected && "h-1 w-16 bg-primary",
                                !disabledProp && !selected && "h-4 w-4 bg-typography transition-all group-hover:h-1 group-hover:w-16 group-hover:bg-typography group-focus-visible:w-16 group-focus-visible:bg-typography motion-reduce:transition-none"
                            ]
                        )}>
                    </span>
                }
                {children}
            </ButtonBase>
        </ListItemBase>
    );
});

ListItemButton.displayName = getDisplayName(ListItemButton);

ListItemButton.propTypes = {
    buttonProps: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    selected: PropTypes.bool
};

export default ListItemButton;
