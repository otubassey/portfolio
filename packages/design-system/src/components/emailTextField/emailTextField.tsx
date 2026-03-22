"use client";

import { ChangeEvent, FocusEvent, useCallback, useState, useId, Ref } from "react";

import { TextField, TextFieldProps } from "../textField";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmailFormat = (
	value: string,
	isRequired?: boolean
): { isValid: boolean; message: string } => {
	if(!value) {
		return {
			isValid: !isRequired,
			message: isRequired ? "Email is required" : ""
		};
	}

	const isValid = EMAIL_REGEX.test(value);
	return {
		isValid,
		message: isValid ? "" : "Please enter a valid email address"
	};
};

export interface EmailTextFieldProps extends Omit<TextFieldProps, "error" | "type"> {
	customError?: string;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onValidityChange?: (isValid: boolean) => void;
	ref?: Ref<HTMLInputElement>;
	required?: boolean;
}

const EmailTextField = ({
	customError,
	id: idProp,
	onBlur,
	onChange,
	onValidityChange,
	ref,
	required = false,
	...props
}: EmailTextFieldProps) => {
	const generatedId = useId();
	const componentId = idProp || generatedId;

    const [internalError, setInternalError] = useState<string>("");

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
		const {isValid, message} = validateEmailFormat(event.target.value, required);

		setInternalError(message);
      	onValidityChange?.(isValid);

		onBlur?.(event);
    }, [onBlur, onValidityChange, required]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if(internalError) {
			setInternalError("");
		}
		onChange?.(event);
    }, [internalError, onChange]);

    return (
		<TextField
			{...props}
			ref={ref}
			autoComplete="email"
			error={customError || internalError}
			id={componentId}
			onBlur={handleBlur}
			onChange={handleChange}
			placeholder="example@domain.com"
			required={required}
			type="email"
		/>
    );
};

EmailTextField.displayName = "EmailTextField";

export default EmailTextField;
