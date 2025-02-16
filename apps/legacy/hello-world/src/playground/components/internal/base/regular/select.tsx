import { ChangeEvent, ForwardedRef, ReactEventHandler, ReactNode, forwardRef, memo, useCallback } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { Typography } from "@/hwiui/widgets/typography";

type Props = {
    title: string;
    children?: ReactNode;
    displayEmpty?: boolean;
    emptyLabel?: string;
    multiple?: boolean;
    onChange?: ReactEventHandler;
    onFocus?: ReactEventHandler;
    value?: Array<any> | any;
};

const Select = forwardRef<HTMLSelectElement, Props>(({
    title,
    children,
    displayEmpty: displayEmptyProp,
    emptyLabel,
    multiple,
    onChange,
    onFocus,
    value
}: Props, ref: ForwardedRef<HTMLSelectElement>) => {
    const displayEmpty = displayEmptyProp ?? false;
    const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const mapValues = (newValue: string) => {
            const values = value || [];
            if(values.some((val: string) => val === newValue)) {
                return values.filter((val: string) => val !== newValue);
            }
            return [...values, newValue];
        };
        const modifiedValue = multiple ? mapValues(event.target.value) : event.target.value;
        const modifiedEvent = {
            ...event,
            target: {
                ...event.target,
                value: modifiedValue
            }
        };
        onChange?.(modifiedEvent);
    }, [multiple, onChange, value]);
    const handleFocus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        onFocus?.(event);
    }, [onFocus]);
    return (
        <select
            ref={ref}
            className="bg-inherit"
            multiple={multiple}
            onChange={handleChange}
            onFocus={handleFocus}
            title={title}
            value={value}>
            {displayEmpty && <option value=""><Typography>{emptyLabel}</Typography></option>}
            {children}
        </select>
    );
});

Select.displayName = getDisplayName(Select);

Select.propTypes = {
    children: PropTypes.node,
    displayEmpty: PropTypes.bool,
    emptyLabel: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.any
    ])
};

export default memo(Select);
