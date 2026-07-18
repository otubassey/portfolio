"use client";

import { BaseSyntheticEvent, ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import { ErrorAttribute, ValidationError } from "@otuekong-portfolio/common";
import {
	Alert,
	Button,
	CssUtils,
	EmailTextField,
	Section,
	TextArea,
	TextField
} from "@otuekong-portfolio/curio";

import { useContactSendEmail } from "../hooks";
import { ContactFormField } from "../types";

export type ValidationErrorsByField<T> = Partial<Record<keyof T, ReadonlyArray<string>>>;

function mapErrorsByField<T>(
    errors: ReadonlyArray<ErrorAttribute>
): ValidationErrorsByField<T> {
    return errors.reduce((acc, current) => {
        const key = current.attribute as keyof T;

        return {
            ...acc,
            [key]: current.errors
        };
    }, {} as ValidationErrorsByField<T>);
}

const DEFAULT_FORM_DATA = Object.freeze({
	name: "",
	email: "",
	message: "",
	zipCode: ""
} as const);

interface ContactFormCardProps {
	className?: string;
	clientId: string;
	targetAppId: string;
	id?: string;
}

function ContactFormCard({
	className,
	clientId,
	targetAppId,
	id
}: ContactFormCardProps) {
	const [formData, setFormData] = useState<ContactFormField>(DEFAULT_FORM_DATA);

	const { isEmailSent, emailError, isEmailSending, sendEmail } = useContactSendEmail(clientId, targetAppId);

	const validationErrorsByFieldOrNull = useMemo(() => {
		if(emailError instanceof ValidationError && emailError.errors.length > 0) {
			return mapErrorsByField<ContactFormField>(emailError.errors);
		}
		return null;
	}, [emailError]);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value
		}));
	}, []);

	const handleSubmit = useCallback((event: BaseSyntheticEvent) => {
		event.preventDefault();
		sendEmail(formData);
	}, [formData, sendEmail]);

	useEffect(() => {
		if(isEmailSent) {
			setFormData(DEFAULT_FORM_DATA);
		}
	}, [isEmailSent]);

	return (
		<Section
			id={id}
			className={CssUtils.mergeClasses(
				"flex flex-col gap-6 p-8 w-full",
				"shadow-md",
				className
			)}
			heading="Send a Message"
			outlined
			raised
			rounded
			shade="light">

			{emailError && (
			<Alert
				copyText={emailError.detail ? JSON.stringify(emailError.detail) : undefined}
				detail={emailError.detail || ""}
				message={emailError.message || "An error occurred while sending your message. Please try again."}
				transactionId={emailError.transactionId}
				variant="filled"
			/>
			)}

			{isEmailSent && (
			<Alert
				autoHideDuration={10000}
				message="Message sent successfully"
				messageProps={{
					className: "text-[15px] md:text-[18px]"
				}}
				severity="success"
				variant="filled"
			/>
			)}

			<div className="leading-relaxed text-slate-600 dark:text-slate-400 space-y-6 p-0">
				<form
					className="space-y-6"
					onSubmit={handleSubmit}>

					<TextField
						autoComplete="name"
						disabled={isEmailSending}
						error={validationErrorsByFieldOrNull?.name?.[0] || ""}
						fullWidth
						id="name"
						label="Your Name"
						name="name"
						onChange={handleChange}
						placeholder="John Doe"
						required
						value={formData.name}
					/>

					<EmailTextField
						autoComplete="email"
						disabled={isEmailSending}
						error={validationErrorsByFieldOrNull?.email?.[0] || ""}
						fullWidth
						id="email"
						label="Your Email"
						name="email"
						onChange={handleChange}
						placeholder="john@example.com"
						required
						value={formData.email}
					/>

					<TextArea
						disabled={isEmailSending}
						error={validationErrorsByFieldOrNull?.message?.[0] || ""}
						fullWidth
						id="message"
						label="Message"
						minRows={6}
						name="message"
						onChange={handleChange}
						placeholder="Tell me about your project..."
						required
						value={formData.message}
					/>

					<div
						aria-hidden="true"
						className="sr-only absolute opacity-0 -z-50 pointer-events-none">

						<label htmlFor="zipCode">Zip Code</label>
						<input
							autoComplete="off"
							id="zipCode"
							name="zipCode"
							onChange={handleChange}
							tabIndex={-1}
							type="text"
							value={formData.zipCode}
						/>

					</div>

					<Button
						fullWidth
						loading={isEmailSending}
						size="large"
						startIcon="send"
						type="submit">
						{ isEmailSending ? "Sending..." : "Send Message" }
					</Button>
				</form>
			</div>

		</Section>
	);
}

ContactFormCard.displayName = "ContactFormCard";

export default ContactFormCard;
