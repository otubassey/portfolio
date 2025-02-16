import { memo, ReactEventHandler } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ValuesOf } from "@/hwiui/widgets/common";
import {FormControlLabel, LabelPlacement} from "./form";

type Props = {
    id?: string;
    checked?: boolean;
    label?: string;
    labelPlacement?: ValuesOf<typeof LabelPlacement>;
    name?: string;
    onChange?: ReactEventHandler;
    placeholder?: string;
    value?: string | number | readonly string[];
};

const Radio = ({
    id,
    checked,
    label,
    labelPlacement,
    name,
    onChange,
    value
}: Props) => {
    if(label) {
        return (
            <FormControlLabel
                control={
                    <input
                        id={id}
                        checked={checked ?? false}
                        className="cursor-pointer"
                        name={name}
                        onChange={onChange}
                        type="radio"
                        value={value}
                    />
                }
                label={label ?? ""}
                labelPlacement={labelPlacement ?? "end"}
            />
        );
    }
    return (
        <input
            id={id}
            checked={checked ?? false}
            className="cursor-pointer"
            name={name}
            onChange={onChange}
            type="radio"
            value={value}
        />
    );
};

Radio.displayName = getDisplayName(Radio);

Radio.propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    labelPlacement: PropTypes.oneOf(Object.values(LabelPlacement)),
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
};

export default memo(Radio);
