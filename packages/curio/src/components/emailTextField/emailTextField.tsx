"use client";

import { ChangeEvent, FocusEvent, useCallback, useState, useId, Ref } from "react";

import { createEmailValidator, ValidationError } from "@otuekong-portfolio/common";

import { TextField, TextFieldProps } from "../textField";

const extractValidationMessage = (error: ValidationError) => {
	if(error.errors.length > 0) {
		return error.errors.flatMap(error => error.errors).join(". ");
	}
	if(error.detail) {
		return error.detail;
	}
	return error.message;
};

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

	const emailValidator = createEmailValidator({
		message: "Please enter a valid email address"
	});
	const validationResult = emailValidator.validate(value);
	const isValid = validationResult.isValid;
	return {
		isValid,
		message: !isValid
			? extractValidationMessage(validationResult.error)
			: ""
	};
};

export interface EmailTextFieldProps extends Omit<TextFieldProps, "type"> {
	error?: string;
	id?: string;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onValidityChange?: (isValid: boolean) => void;
	ref?: Ref<HTMLInputElement>;
	required?: boolean;
}

const EmailTextField = ({
	error,
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
			error={error || internalError}
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
