import { ChangeEvent, memo } from "react";

import { displayName } from "@/hwiui/decorator";
import { useGeneratedId } from "@/hwiui/hooks";
import { ClassesUtils } from "@/hwiutils";
import { Typography } from "@/hwiui/widgets/typography";

type Props = {
    checked?: boolean;
    disabled?: boolean;
    label: string;
    name: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

const Radio = ({
    checked = false,
    disabled = false,
    label,
    name,
    onChange,
    value
}: Props) => {
    const componentId = useGeneratedId();
    return (
        <label htmlFor={componentId!} className={ClassesUtils.concat("flex", {["gap-3"]: Boolean(label), ["cursor-pointer"]: !disabled})}>
            <input
                id={componentId!}
                type="radio"
                name={name}
                checked={checked}
                className={ClassesUtils.concat({["cursor-pointer"]: !disabled})}
                disabled={disabled}
                onChange={onChange}
                value={value}
            />
            <Typography>{label}</Typography>
        </label>
    );
};

export default memo(displayName()(Radio));
