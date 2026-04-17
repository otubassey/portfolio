"use client";

import { Ref, useId } from "react";

import {CssUtils} from "../../utils";

import { Icon } from "../icon";
import {TextField, TextFieldProps} from "../textField";

export interface SearchFieldProps extends Omit<TextFieldProps, "onChange"> {
	className?: string;
    fullWidth?: boolean;
    onChange?: (value: string) => void;
    placeholder?: string;
	ref?: Ref<HTMLInputElement>;
}

const SearchField = ({
	className,
    fullWidth = false,
    onChange,
    placeholder = "Search items...",
	ref,
	...props
}: SearchFieldProps) => {
	const componentId = useId();
    return (
        <TextField
			ref={ref}
			aria-invalid="false"
            className={CssUtils.mergeClasses("hidden md:flex flex-1 max-w-md", className)}
            fullWidth={fullWidth}
            id={componentId}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            size="small"
            startIcon={<Icon name="search" size={20} />}
            type="text"
			{...props}
        />
    );
};

SearchField.displayName = "SearchField";

export default SearchField;
