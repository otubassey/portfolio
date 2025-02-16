import { Children, cloneElement, isValidElement, memo, ReactNode } from "react";

import { ClassesUtils } from "@/hwiutils";

type Props = {
    children?: ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    hideLabel?: boolean;
};

const FormControl = ({
    children,
    disabled,
    fullWidth,
    hideLabel
}: Props) => {
    return (
        <div className={ClassesUtils.merge(
            "inline-flex gap-x-4",
            [fullWidth && "w-full"]
        )}>
            {Children.map(children, child => (
                isValidElement(child) ? cloneElement(child, {...child.props, disabled}) : child
            ))}
        </div>
    );
};

export default memo(FormControl);
