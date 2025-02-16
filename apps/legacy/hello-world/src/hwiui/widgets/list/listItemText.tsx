import { ForwardedRef, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import ListItemBase, {ListItemBaseProps} from "./listItemBase";
import { Typography, TypographyProps } from "../typography";

type ClassNameProp = {
    root?: string;
    primary?: string;
    secondary?: string;
};

export type Props = ListItemBaseProps & {
    classes?: ClassNameProp;
    primary?: string;
    primaryTypographyProps?: TypographyProps;
    secondary?: string;
    secondaryTypographyProps?: TypographyProps;
};

const ListItemText = forwardRef<HTMLLIElement, Props>(({
    children = null,
    classes,
    primary,
    primaryTypographyProps,
    secondary,
    secondaryTypographyProps,
    ...listItemProps
}: Props, ref: ForwardedRef<HTMLLIElement>) => {
    return (
        <ListItemBase
            ref={ref}
            className={classes?.root}
            {...listItemProps}>
            {
                !children
                    ? (
                        <>
                            {
                                Boolean(primary) &&
                                <Typography className={classes?.primary} {...(primaryTypographyProps ?? {})}>{primary}</Typography>
                            }
                            {
                                Boolean(secondary) &&
                                <Typography className={classes?.secondary} variant="body2" {...(secondaryTypographyProps ?? {})}>{secondary}</Typography>
                            }
                        </>
                    )
                    : children
            }
        </ListItemBase>
    );
});

ListItemText.displayName = getDisplayName(ListItemText);

ListItemText.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.shape({
        root: PropTypes.string,
        primary: PropTypes.string,
        secondary: PropTypes.string,
    }),
    primary: PropTypes.string,
    primaryTypographyProps: PropTypes.object,
    secondary: PropTypes.string,
    secondaryTypographyProps: PropTypes.object
};

export default ListItemText;
