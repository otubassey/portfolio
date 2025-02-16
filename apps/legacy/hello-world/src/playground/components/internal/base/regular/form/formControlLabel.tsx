import { ForwardedRef, forwardRef, memo, ReactNode } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ValuesOf } from "@/hwiui/widgets/common";
import { Typography } from "@/hwiui/widgets/typography";
import { ClassesUtils } from "@/hwiutils";

export const LabelPlacement = {
    BOTTOM: "bottom",
    END: "end",
    START: "start",
    TOP: "top"
} as const;

type Props = {
    control: ReactNode;
    label?: string;
    labelPlacement?: ValuesOf<typeof LabelPlacement>;
};

const FormControlLabel = forwardRef<HTMLLabelElement, Props>(({
    control,
    label,
    labelPlacement: labelPlacementProp
}: Props, ref: ForwardedRef<HTMLLabelElement>) => {
    if(!control) {
        return null;
    }
    const labelPlacement = labelPlacementProp ?? LabelPlacement.END;
    return (
        <Typography
            ref={ref}
            component="label"
            className={ClassesUtils.merge(
                "cursor-pointer gap-x-4 items-center",
                [
                    labelPlacement === LabelPlacement.END && "inline-flex",
                    labelPlacement === LabelPlacement.START && "inline-flex"
                ]
            )}>
            {
                label && [LabelPlacement.START , LabelPlacement.TOP].includes(labelPlacement) &&
                <span>{label ?? "--"}</span>
            }
            <span>{control}</span>
            {
                label && [LabelPlacement.BOTTOM , LabelPlacement.END].includes(labelPlacement) &&
                <span>{label ?? "--"}</span>
            }
        </Typography>
    );
});

FormControlLabel.displayName = getDisplayName(FormControlLabel);

FormControlLabel.propTypes = {
    control: PropTypes.node,
    label: PropTypes.string,
    labelPlacement: PropTypes.oneOf(Object.values(LabelPlacement))
};

export default memo(FormControlLabel);
